#!/usr/bin/env node

import * as path from 'path'
import * as fs from 'fs'
import * as ora from 'ora'
import * as inquirer from 'inquirer'
import * as mkdirp from 'mkdirp'

import { loadTemplate, Template } from './loader'

export interface Options {
  force: boolean
}

/**
 *
 * Creates a CLI tool from description and templates.
 *
 * @param templates
 * @param options
 */
export async function creato(
  templates: Template[],
  options: Options,
): Promise<void> {
  /**
   * Inquier about template
   */
  const { template } = await inquirer.prompt<{ template: Template }>([
    {
      name: 'template',
      message: 'Choose a template!',
      type: 'list',
      choices: templates.map(template => ({
        name: `${template.name}    ${template.description}`,
        value: template,
      })),
    },
  ])

  const { dist } = await inquirer.prompt<{ dist: string }>([
    {
      name: 'dist',
      message: 'Where should we scaffold your template?',
      type: 'input',
    },
  ])

  const absoluteDist = path.resolve(process.cwd(), dist)

  if (fs.existsSync(absoluteDist) && !options.force) {
    console.warn(`Directory ${absoluteDist} must be empty.`)
    return process.exit(1)
  } else {
    mkdirp.sync(absoluteDist)
  }

  /**
   * Load template
   */
  const spinner = ora({
    text: `Loading ${template.name} template.`,
  }).start()

  const res = await loadTemplate(template, absoluteDist)

  if (res.status === 'ok') {
    spinner.succeed()
    console.log(res.message)
    return process.exit(0)
  } else {
    spinner.fail()
    console.warn(res.message)
    return process.exit(1)
  }
}

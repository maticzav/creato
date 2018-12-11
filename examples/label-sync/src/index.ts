import { creato, Template } from 'creato'
import * as meow from 'meow'

const cli = meow(
  `
create-boilerplates

> Helps you start with the project more quickly and more easily.

Options:
  --force Force the installation in directory.
`,
  {
    flags: {
      force: {
        type: 'boolean',
        default: false,
      },
    },
  },
)

const templates: Template[] = [
  {
    name: 'json',
    description: 'JSON template with basic CircleCI config.',
    repo: {
      uri: 'https://github.com/maticzav/label-sync',
      branch: 'master',
      path: '/examples/with-circleci',
    },
  },
  {
    name: 'javascript',
    description: 'JavaScript template with basic CircleCI config.',
    repo: {
      uri: 'https://github.com/maticzav/label-sync',
      branch: 'master',
      path: '/examples/with-javascript',
    },
  },
  {
    name: 'typescript',
    description: 'CircleCI template with basic CircleCI config.',
    repo: {
      uri: 'https://github.com/maticzav/label-sync',
      branch: 'master',
      path: '/examples/with-typescript',
    },
  },
]

creato(templates, {
  force: cli.flags.force,
})

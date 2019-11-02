import * as inquirer from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'
import * as mkdirp from 'mkdirp'

import { creato } from '../src'

import * as loader from '../src/loader'

describe('bin', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('returns on existing directory and no force', async () => {
    const dist = path.resolve(__dirname, './__tmp__/folder')

    /**
     * Mocks
     */
    const inquirerPromptMock = jest
      .spyOn(inquirer, 'prompt')
      .mockResolvedValueOnce({ template: 'template' })
      .mockResolvedValueOnce({ dist: dist })
    const fsExistsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true)
    const fsMkdirSync = jest.spyOn(mkdirp, 'sync')
    const consoleLogMock = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {})
    const consoleWarnMock = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {})
    const loadTemplateMock = jest.spyOn(loader, 'loadTemplate')
    const processExitMock = jest
      .spyOn<any, any>(process, 'exit')
      .mockImplementation(() => {})

    /**
     * Execution
     */

    await creato(
      [
        {
          name: 'test-template',
          description: 'test-template description',
          repo: {
            uri: 'https://github.com/maticzav/creato',
            branch: 'master',
            path: '/examples/label-sync',
          },
        },
      ],
      {
        force: false,
      },
    )

    /**
     * Tests
     */

    expect(inquirerPromptMock).toHaveBeenCalledTimes(2)
    expect(fsExistsSyncMock).toHaveBeenCalledTimes(1)
    expect(fsMkdirSync).toHaveBeenCalledTimes(0)
    expect(consoleLogMock).toHaveBeenCalledTimes(0)
    expect(loadTemplateMock).toHaveBeenCalledTimes(0)
    expect(consoleLogMock).toHaveBeenCalledTimes(0)
    expect(processExitMock).toHaveBeenCalledWith(1)
    expect(consoleWarnMock).toHaveBeenCalledWith(
      `Directory ${dist} must be empty.`,
    )
  })

  test('overrides directory on force', async () => {
    const dist = path.resolve(__dirname, 'folder')

    /**
     * Mocks
     */
    const inquirerPromptMock = jest
      .spyOn(inquirer, 'prompt')
      .mockResolvedValueOnce({ template: 'template' })
      .mockResolvedValueOnce({ dist: dist })
    const fsExistsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false)
    const fsMkdirSync = jest
      .spyOn(mkdirp, 'sync')
      .mockImplementation(() => null)
    const consoleLogMock = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {})
    const loadTemplateMock = jest
      .spyOn(loader, 'loadTemplate')
      .mockResolvedValue({ status: 'ok', message: 'pass' })
    const processExitMock = jest
      .spyOn<any, any>(process, 'exit')
      .mockImplementation(() => {})

    /**
     * Execution
     */

    await creato(
      [
        {
          name: 'test-template',
          description: 'test-template description',
          repo: {
            uri: 'https://github.com/maticzav/creato',
            branch: 'master',
            path: '/examples/label-sync',
          },
        },
      ],
      {
        force: true,
      },
    )

    /**
     * Tests
     */

    expect(inquirerPromptMock).toHaveBeenCalledTimes(2)
    expect(fsExistsSyncMock).toHaveBeenCalledTimes(1)
    expect(fsMkdirSync).toHaveBeenCalledTimes(1)
    expect(consoleLogMock).toHaveBeenCalledTimes(1)
    expect(loadTemplateMock).toHaveBeenCalledTimes(1)
    expect(consoleLogMock).toHaveBeenCalledWith('pass')
    expect(processExitMock).toBeCalledWith(0)
  })

  test('logs success on success', async () => {
    const dist = path.resolve(__dirname, 'folder')

    /**
     * Mocks
     */
    const inquirerPromptMock = jest
      .spyOn(inquirer, 'prompt')
      .mockResolvedValueOnce({ template: 'template' })
      .mockResolvedValueOnce({ dist: dist })
    const fsExistsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false)
    const fsMkdirSync = jest
      .spyOn(mkdirp, 'sync')
      .mockImplementation(() => null)
    const consoleLogMock = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {})
    const loadTemplateMock = jest
      .spyOn(loader, 'loadTemplate')
      .mockResolvedValue({ status: 'ok', message: 'pass' })
    const processExitMock = jest
      .spyOn<any, any>(process, 'exit')
      .mockImplementation(() => {})

    /**
     * Execution
     */

    await creato(
      [
        {
          name: 'test-template',
          description: 'test-template description',
          repo: {
            uri: 'https://github.com/maticzav/creato',
            branch: 'master',
            path: '/examples/label-sync',
          },
        },
      ],
      {
        force: false,
      },
    )

    /**
     * Tests
     */

    expect(inquirerPromptMock).toHaveBeenCalledTimes(2)
    expect(fsExistsSyncMock).toHaveBeenCalledTimes(1)
    expect(fsMkdirSync).toHaveBeenCalledTimes(1)
    expect(consoleLogMock).toHaveBeenCalledTimes(1)
    expect(loadTemplateMock).toHaveBeenCalledTimes(1)
    expect(consoleLogMock).toHaveBeenCalledWith('pass')
    expect(processExitMock).toBeCalledWith(0)
  })

  test('warns error on error', async () => {
    const dist = path.resolve(__dirname, 'folder')

    /**
     * Mocks
     */
    const inquirerPromptMock = jest
      .spyOn(inquirer, 'prompt')
      .mockResolvedValueOnce({ template: 'template' })
      .mockResolvedValueOnce({ dist: dist })
    const fsExistsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false)
    const fsMkdirSync = jest
      .spyOn(mkdirp, 'sync')
      .mockImplementation(() => null)
    const consoleLogMock = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {})
    const consoleWarnMock = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {})
    const loadTemplateMock = jest
      .spyOn(loader, 'loadTemplate')
      .mockResolvedValue({ status: 'err', message: 'pass' })
    const processExitMock = jest
      .spyOn<any, any>(process, 'exit')
      .mockImplementation(() => {})

    /**
     * Execution
     */

    await creato(
      [
        {
          name: 'test-template',
          description: 'test-template description',
          repo: {
            uri: 'https://github.com/maticzav/creato',
            branch: 'master',
            path: '/examples/label-sync',
          },
        },
      ],
      {
        force: false,
      },
    )

    /**
     * Tests
     */

    expect(inquirerPromptMock).toHaveBeenCalledTimes(2)
    expect(fsExistsSyncMock).toHaveBeenCalledTimes(1)
    expect(fsMkdirSync).toHaveBeenCalledTimes(1)
    expect(consoleLogMock).toHaveBeenCalledTimes(0)
    expect(consoleWarnMock).toHaveBeenCalledTimes(1)
    expect(loadTemplateMock).toHaveBeenCalledTimes(1)
    expect(consoleWarnMock).toHaveBeenCalledWith('pass')
    expect(processExitMock).toBeCalledWith(1)
  })
})

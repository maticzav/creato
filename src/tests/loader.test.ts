import * as tar from 'tar'
import * as fs from 'fs'
import * as tmp from 'tmp'
import * as path from 'path'
import * as mkdirp from 'mkdirp'

import { loadTemplate } from '../'

describe('bin', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('loadTemplate loads template correctly', async () => {
    const res = await loadTemplate(
      {
        name: 'test-template',
        description: 'test-description',
        repo: {
          branch: 'test-branch',
          uri: 'test-uri',
          path: 'test-path',
        },
      },
      'path',
    )

    expect(res).toEqual({
      status: 'ok',
      message: 'Successfully installed template.',
    })
  })

  test('loadTemplate returns error on bad download', async () => {
    /**
     * Mocks
     */

    const mockTmpFileSync = jest
      .spyOn(tmp, 'fileSync')
      .mockImplementation(() => {
        throw new Error('pass')
      })

    /**
     * Execution
     */

    const res = await loadTemplate(
      {
        name: 'test-template',
        description: 'test-description',
        repo: {
          branch: 'test-branch',
          uri: 'test-uri',
          path: 'test-path',
        },
      },
      'path',
    )

    /**
     * Tests
     */

    expect(mockTmpFileSync).toBeCalledTimes(1)
    expect(res).toEqual({
      status: 'err',
      message: 'pass',
    })
  })

  test('loadTemplate returns error on bad unzip', async () => {
    /**
     * Mocks
     */

    const mockTarExtract = jest.spyOn(tar, 'extract').mockImplementation(() => {
      throw new Error('pass')
    })

    /**
     * Execution
     */

    const res = await loadTemplate(
      {
        name: 'test-template',
        description: 'test-description',
        repo: {
          branch: 'test-branch',
          uri: 'test-uri',
          path: 'test-path',
        },
      },
      'path',
    )

    /**
     * Tests
     */

    expect(mockTarExtract).toBeCalledTimes(1)
    expect(res).toEqual({
      status: 'err',
      message: 'pass',
    })
  })

  test('loads the template correctly', async () => {
    /**
     * Setup dist
     */
    const dist = path.resolve(__dirname, './__tmp__/template')

    try {
      mkdirp.sync(dist)
    } catch (err) {
      fail()
    }

    /**
     * Test
     */

    try {
      const res = await loadTemplate(
        {
          name: 'test-template',
          description: 'test-template description',
          repo: {
            uri: 'https://github.com/maticzav/creato',
            branch: 'master',
            path: '/examples/label-sync',
          },
        },
        dist,
      )

      expect(res).toEqual({
        status: 'ok',
        message: 'Successfully installed template.',
      })
      expect(fs.existsSync(path.resolve(dist, 'package.json'))).toBe(true)
    } catch (err) {
      fail()
    }
  })
})

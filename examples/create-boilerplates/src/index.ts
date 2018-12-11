import creato, { Template } from 'creato'

const description = `
creato

> Helps you start with the project more quickly and more easily.

Options:
  --force Force the installation in directory.
`

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
]

creato(description, templates)

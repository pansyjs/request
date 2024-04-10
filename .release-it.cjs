module.exports =  {
  git: {
    commitMessage: 'chore(release): v${version}',
    push: true,
    commit: true,
    tag: true,
    requireCommits: false,
    requireCleanWorkingDir: false
  },
  github: {
    release: true,
    draft: true
  },
  npm: {
    publish: true,
    ignoreVersion: false
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
      header: '# Changelog'
    }
  },
  hooks: {
    'after:bump': 'pnpm run build',
    'after:release': 'echo Successfully released ${name} v${version} to ${repo.repository}.'
  }
}

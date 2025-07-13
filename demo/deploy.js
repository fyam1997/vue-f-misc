const git = require('git-rev-sync')
const ghPages = require('gh-pages')
const pkg = require('./package.json')

const commitMsg = `${pkg.version}@${git.long()}`
console.log(`Publishing: ${commitMsg}`)

ghPages.publish(
    './dist',
    {
        message: commitMsg
    },
    () => {
        console.log("Done")
    }
)

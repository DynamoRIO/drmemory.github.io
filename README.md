# Dr. Memory

![Dr. Memory logo](http://www.burningcutlery.com/images/dynamorio/DrMemory-logo.png)

This is the source content for the Dr. Memory website.

Please file any issues in the main [Dr. Memory issue
tracker](https://github.com/DynamoRIO/drmemory/issues).

## Testing Locally

You can use jekyll to run a local server and view local changes to the
website contents.

First, install ruby, bundler, and the needed gems:
```
$ sudo apt-get install ruby-dev
$ sudo gem install bundler
$ bundle install
```

Now you can launch the local server:
```
bundle exec jekyll serve
```

Go to this address in your browser to view the local content, which is
stored in the `_site` directory of your git checkout:

[http://localhost:4000](http://localhost:4000)

## Contributing Changes

Please use the [same basic workflow as for Dr. Memory
changes](https://github.com/DynamoRIO/drmemory/wiki/Workflow): i.e.,
perform changes in a separate branch and use a Pull Request to
squash-and-merge it into master after it is reviewed.

Run these commands to mirror the `devsetup.sh` script in the `drmemory`
repository, first replacing `PATH_TO_DR` with the path to your checkout of
`drmemory` for locating the helper scripts:
```
$ git config core.autocrlf input
$ git config core.whitespace blank-at-eol,tab-in-indent
$ git config branch.autosetuprebase always
$ git config alias.newbranch '!sh -c "git checkout --track -b $1 origin/master"'
$ git config alias.split '!sh -c "git checkout -b $1 $2 && git branch --set-upstream-to=origin/master $1"'
$ git config alias.review '!myf() { PATH_TO_DRMEMORY/make/git/git_review.sh "$@"; }; myf'
$ git config alias.pullall '!myf() { PATH_TO_DRMEMORY/make/git/git_pullall.sh "$@"; }; myf'
$ echo Please ensure your author name is correct: \"$(git config user.name)\"
$ echo "  Run \"git config user.name New Name\" to update"
$ echo Please ensure your author email is correct: \"$(git config user.email)\"
$ echo "  Run \"git config user.email New Email\" to update"
```

Replace all references in printed statements from the scripts with the
`drmemory.github.io` repository rather than the `drmemory` repository, of
course.

Since we are using the issue tracker in the main `drmemory` repository,
instead of a simple `#NNNN` to refer to an issue, use the string
`DynamoRIO/drmemory#NNNN`.

Consider attaching a screenshot of the new page to the Pull Request if it
is a proposed layout change.

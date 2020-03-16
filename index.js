#! /usr/bin/env node
const execa = require('execa')

class GitObj {
  constructor () {
    this.url = ''
  }
  async getGitUrl (){
    const { stdout } = await execa('git', ['config', '--get', 'remote.origin.url']);
    console.log('git remote origin url', stdout);
    this.url = stdout;
    return stdout
  }
  getHttpUrl () {
    const { url: input } = this;
    const out = input.replace('git@', 'http://')
    return out;
  }
}
const gitObj = new GitObj()
gitObj.getGitUrl().then(url => {
  const httpUrl =  gitObj.getHttpUrl();
  console.log('open', httpUrl);
  execa('open', [httpUrl])
});

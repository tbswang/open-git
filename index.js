const execa = require('execa');

class GitObj {
  constructor () {
    this.url = ''
  }
  async getGitUrl (){
    const { stdout } = await execa('git', ['config', '--get', 'remote.origin.url']);
    console.log('GitObj -> getGitUrl -> out', stdout);
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
  console.log('httpUrl', httpUrl);
  execa('open', [httpUrl])
});

// execa('open', [giturl])

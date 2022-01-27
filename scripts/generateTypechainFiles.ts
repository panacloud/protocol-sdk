const { execSync } = require('child_process')
const { readdir, mkdirSync, existsSync } = require('fs')
const path = require('path')

// Directories where the Typechain files will be generated
const outDirSrc = 'typechain/src/'
const typeChainDirectorySrcPath = path.join(__dirname, `../${outDirSrc}`)

const outDirBuild = 'dist/typechain/src/'
const typeChainDirectoryBuildPath = path.join(__dirname, `../${outDirBuild}`)

// Contract list for which the Typechain files will be generated
// Will be included in dist/ folder
/*
const safeContractsPath = '../node_modules/@gnosis.pm/safe-contracts/build/contracts'
const safeContracts = [
  `${safeContractsPath}/GnosisSafe.json`,
  `${safeContractsPath}/GnosisSafeProxyFactory.json`,
  `${safeContractsPath}/MultiSend.json`,
].join(' ')
*/
const panaContractsPath = './demo-contracts/build/artifacts/contracts'
const panaContracts = [
  `${panaContractsPath}/PanaFactory.sol/PanaFactory.json`,
  `${panaContractsPath}/PanacloudPlatform.sol/PanacloudPlatform.json`
].join(' ')
//D:\developmentData\PanaCloud\projects\panacloud-store\protocol-sdk\demo-contracts\build\artifacts\contracts\PanaFactory.sol\PanaFactory.json
// Remove existing Typechain files
execSync(`rimraf ${outDirSrc}`, (error) => {
  if (error) {
    console.log(error.message)
    return
  }
})

// Generate Typechain files
function generateTypechainFiles(typechainVersion, outDir, contractList) {
  execSync(`typechain --target ${typechainVersion} --out-dir ${outDir}${typechainVersion} ${contractList}`, (error) => {
    if (error) {
      console.log(error.message)
    }
  })
  console.log(`Generated typechain ${typechainVersion} at ${outDir}`)
}

// Copy Typechain files with the right extension (.d.ts -> .ts) allows them to be included in the build folder
function moveTypechainFiles(typechainVersion, inDir, outDir) {
  readdir(`${inDir}${typechainVersion}`, (error, files) => {
    if (error) {
      console.log(error)
    }
    if (!existsSync(`${outDir}${typechainVersion}`)) {
      mkdirSync(`${outDir}${typechainVersion}`, { recursive: true })
    }
    files.forEach(file => {
      const pattern = /.d.ts/
      if (!file.match(pattern)) {
        return
      }
      execSync(`copy ${inDir}${typechainVersion}\\${file} ${outDir}${typechainVersion}\\${file}`)
    })
  })
}

const ethersV5 = 'ethers-v5'

// Src: Ethers V5 types
generateTypechainFiles(ethersV5, outDirSrc, panaContracts)
moveTypechainFiles(ethersV5, typeChainDirectorySrcPath, typeChainDirectoryBuildPath)

import { spawn } from 'child_process'

type Params = {
    mainCmd: string[]
    cleanupCmd: string[]
}

function runWithCleanup({mainCmd, cleanupCmd}: Params) {
    const child = spawn(mainCmd[0], mainCmd.slice(1), { 
        shell: true, 
        stdio: 'inherit' 
    })

    const cleanup = () => {
        console.log('\n🧹 Running cleanup...')
        child.kill()
        
        const cleanupProcess = spawn(cleanupCmd[0], cleanupCmd.slice(1), {
            shell: true,
            stdio: 'inherit'
        })
        
        cleanupProcess.on('close', () => {
            console.log('✅ Cleanup complete')
            process.exit(0)
        })
    }

    process.on('SIGINT', cleanup)
    process.on('SIGTERM', cleanup)
}

// Usage
runWithCleanup({
    mainCmd: ['pnpm', 'run', 'local:all'],
    cleanupCmd: ['pnpm', 'run', 'db:down']
})

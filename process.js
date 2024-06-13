import { Command } from 'commander'
const program = new Command()

program
    .option('-d', 'Variable para debug ', false)

    .option('-p <port>', 'puerto del server ', false)
    .option('--mode <mode>', 'modo de trabajo de mi server ', 'production')
    .option('-u <user>', 'usuario usando el applicativo ', 'no se ha declarado user')
    .option('-l , --letters [letters...]', 'specify letter')
    .parse()

console.log('options: ', program.opts())
console.log('Argumento: ', program.args)

//node process.js -d -p 3000 --mode development -u root --letters a b s
//node process.js  -p 3000  -u root 2 a 5  --letters a b s

export const logger = {
    log: (input: any, tag?: string) => {
        console.log(tag ? `[${tag}] ${input}` : input)
    },
    info: (input: any) => {
        console.info(input)
    },
    error: (input: any, tag?: string) => {
        console.error(tag ? `[${tag}] ${input}` : input)
    }
}
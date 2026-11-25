declare global {
    namespace App {}
}

declare module "*.txt?raw" {
    const content: string;
    export default content;
}

export {};

export interface Server {
    execute(request: any): Promise<any>;
}
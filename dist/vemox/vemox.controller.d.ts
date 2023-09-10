import { VemoxService } from './vemox.service';
import { VemoxInputDto } from './vemox.dto';
export declare class VemoxController {
    private readonly vemoxService;
    constructor(vemoxService: VemoxService);
    vemoxNormal(body: VemoxInputDto): Promise<string>;
    vemoxJson(body: VemoxInputDto): Promise<{
        status: boolean;
    }>;
}

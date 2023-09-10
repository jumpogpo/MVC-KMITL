import { Model } from "mongoose";
import { VemoxInputDto } from './vemox.dto';
import { VemoxData } from 'src/db/vemox.schema';
export declare class VemoxService {
    private vemoxDataModel;
    constructor(vemoxDataModel: Model<VemoxData>);
    vemoxNormal(body: VemoxInputDto): Promise<string>;
    vemoxJson(body: VemoxInputDto): Promise<{
        status: boolean;
    }>;
    private vemox;
    private handleSQL;
    private handleMQL;
}

import { D as DBFieldAttribute } from './core.CajxAutx.cjs';

type BetterAuthPluginDBSchema = {
    [table in string]: {
        fields: {
            [field in string]: DBFieldAttribute;
        };
        disableMigration?: boolean;
        modelName?: string;
    };
};

export type { BetterAuthPluginDBSchema as B };

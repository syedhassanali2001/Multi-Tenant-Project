import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    Association,
} from 'sequelize';
import { TenantTenant } from './tenant_tenant'; // Adjust import based on your structure

interface OrganizationOrganizationAttributes {
    id: bigint;
    created: Date;
    modified: Date;
    status: number;
    activate_date?: Date | null;
    deactivate_date?: Date | null;
    name: string;
    industry: string;
    phone?: string;
    email?: string;
    url?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    ntn?: string;
    data?: object; 
    employees_count?: number;
    type?: string;
    deleted_at?: Date | null;
}

interface OrganizationOrganizationCreationAttributes
    extends Optional<OrganizationOrganizationAttributes, 'id' | 'activate_date' | 'deactivate_date' | 'deleted_at'> {}

export class OrganizationOrganization extends Model<OrganizationOrganizationAttributes, OrganizationOrganizationCreationAttributes>
    implements OrganizationOrganizationAttributes {
    public id!: bigint;
    public created!: Date;
    public modified!: Date;
    public status!: number;
    public activate_date?: Date | null;
    public deactivate_date?: Date | null;
    public name!: string;
    public industry!: string;
    public phone?: string;
    public email?: string;
    public url?: string;
    public address?: string;
    public city?: string;
    public state?: string;
    public country?: string;
    public ntn?: string;
    public data?: object;
    public employees_count?: number;
    public type?: string;
    public deleted_at?: Date | null;
    

    public static associations: {
        tenant: Association<OrganizationOrganization, TenantTenant>; // Define association
    };
}

export const initOrganizationOrganization = (sequelize: Sequelize): typeof OrganizationOrganization => {
    OrganizationOrganization.init(
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            created: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            modified: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            activate_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            deactivate_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            industry: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(128),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(254),
                allowNull: true,
            },
            url: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
            state: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
            country: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
            ntn: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
            data: {
                type: DataTypes.JSONB, // Use JSONB for PostgreSQL
                allowNull: true,
            },
            employees_count: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            type: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'organization_organization',
            tableName: 'organization_organization', // Specify the actual table na
            timestamps: false,// You're manually handling timestamps 
        }
    );
    
    return OrganizationOrganization;
};

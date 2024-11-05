import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    Association,
  } from 'sequelize';
  import { TenantDomain } from './tenant_domain';
  
  interface TenantTenantAttributes {
    id: bigint;
    schema_name: string;
    created: Date;
    modified: Date;
    status: number;
    activate_date?: Date | null;
    deactivate_date?: Date | null;
    name: string;
    phone: string;
    address?: string | null;
    language: string;
    currency: string;
    deleted_at?: Date | null;
  }
  
  interface TenantTenantCreationAttributes
    extends Optional<TenantTenantAttributes, 'id' | 'activate_date' | 'deactivate_date' | 'address' | 'deleted_at'> {}
  
  export class TenantTenant extends Model<TenantTenantAttributes, TenantTenantCreationAttributes>
    implements TenantTenantAttributes {
    public id!: bigint;
    public schema_name!: string;
    public created!: Date;
    public modified!: Date;
    public status!: number;
    public activate_date?: Date | null;
    public deactivate_date?: Date | null;
    public name!: string;
    public phone!: string;
    public address?: string | null;
    public language!: string;
    public currency!: string;
    public deleted_at?: Date | null;
  
    public static associations: {
      domains: Association<TenantTenant, TenantDomain>;
    };
  }
  
  export const initTenantTenant = (sequelize: Sequelize): typeof TenantTenant => {
    TenantTenant.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        schema_name: {
          type: DataTypes.STRING(63),
          unique: true,
          allowNull: false,
        },
        created: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        modified: {
          type: DataTypes.DATE,
          allowNull: false,
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
        phone: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        language: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        currency: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'tenant_tenant',
        tableName:'tenant_tenant',
        schema: 'public',
        indexes: [
          {
            fields: ['schema_name'],
            name: 'tenant_tenant_schema_name_792eb107_like',
          },
        ],
        timestamps: false,
      }
    );
  
    return TenantTenant;
  };
  
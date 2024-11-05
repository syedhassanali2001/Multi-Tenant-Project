import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    Association,
  } from 'sequelize';
  import { TenantTenant } from './tenant_tenant';
  
  interface TenantDomainAttributes {
    id: bigint;
    domain: string;
    is_primary: boolean;
    created: Date;
    modified: Date;
    status: number;
    activate_date?: Date | null;
    deactivate_date?: Date | null;
    tenant_id: bigint;
    deleted_at?: Date | null;
  }
  
  interface TenantDomainCreationAttributes
    extends Optional<TenantDomainAttributes, 'id' | 'activate_date' | 'deactivate_date' | 'deleted_at'> {}
  
  export class TenantDomain extends Model<TenantDomainAttributes, TenantDomainCreationAttributes>
    implements TenantDomainAttributes {
    public id!: bigint;
    public domain!: string;
    public is_primary!: boolean;
    public created!: Date;
    public modified!: Date;
    public status!: number;
    public activate_date?: Date | null;
    public deactivate_date?: Date | null;
    public tenant_id!: bigint;
    public deleted_at?: Date | null;
  
    public static associations: {
      tenant: Association<TenantDomain, TenantTenant>;
    };
  }
  
  export const initTenantDomain = (sequelize: Sequelize): typeof TenantDomain => {
    TenantDomain.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        domain: {
          type: DataTypes.STRING(253),
          unique: true,
          allowNull: false,
        },
        is_primary: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        created: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW, // Optionally set a default value
        },
        modified: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW, // Optionally set a default value
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
        tenant_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'tenant_domain',
        tableName:'tenant_domain', // Ensure this matches the actual table name
        schema: 'public', // Specify if using a specific schema
        indexes: [
          {
            fields: ['domain'],
            name: 'tenant_domain_domain_39f2eb25_like',
          },
          {
            fields: ['is_primary'],
            name: 'tenant_domain_is_primary_7ac9f0f6',
          },
          {
            fields: ['tenant_id'],
            name: 'tenant_domain_tenant_id_39f27a09',
          },
        ],
        timestamps: false, // You're manually handling timestamps
      }
    );
  
    return TenantDomain;
  };
  
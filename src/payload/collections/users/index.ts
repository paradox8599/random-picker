import type { CollectionConfig } from 'payload';
import { userAuth } from './auth';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: userAuth,

  admin: { useAsTitle: 'email', hidden: true },

  access: { create: () => false, delete: () => false, unlock: () => false },

  fields: [
    {
      name: 'email',
      type: 'email',
      unique: true,
      required: true,
      admin: { hidden: true },
      access: { update: () => false },
    },

    { name: 'name', label: 'Display Name', type: 'text', required: true },
  ],
};

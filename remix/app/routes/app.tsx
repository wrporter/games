import type { LoaderFunction } from '@remix-run/node';
import { requireUser } from '~/auth.server';
import React from 'react';
import { Outlet } from '@remix-run/react';
import logger from '~/server/logger';

export const loader: LoaderFunction = async ({ request, context }) => {
    logger.info(
        'Example log with transaction context',
        context.transactionContext,
    );
    return await requireUser(request);
};

export default function HomePage() {
    return <Outlet />;
}

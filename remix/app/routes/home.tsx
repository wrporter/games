import Header from '~/components/Header';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/auth.server';
import React from 'react';
import logger from '../../server/logger';

export const loader: LoaderFunction = async ({ request, context }) => {
    logger.info(
        'Example log with transaction context',
        context.transactionContext,
    );
    const user = await requireUser(request);

    return json({ user });
};

export default function HomePage() {
    return (
        <div className="flex h-full min-h-screen flex-col">
            <Header />

            <main className="p-8">
                <div className="flex items-end space-x-1">You are home!</div>
            </main>
        </div>
    );
}

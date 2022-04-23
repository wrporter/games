import Header from '~/components/Header';
import React from 'react';
import { Outlet } from '@remix-run/react';

export default function HomePage() {
    return (
        <div className="flex h-full min-h-screen flex-col">
            <Header />

            <main className="p-8">
                <div className="flex items-end space-x-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

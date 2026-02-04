'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PawPrint, Users, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts';

export function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname === '/pets';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <PawPrint className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">
                Pet Manager
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              href="/"
              className={`
                px-3 py-2 rounded-lg font-medium transition-colors
                ${isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <span className="flex items-center gap-2">
                <PawPrint className="w-4 h-4" />
                Pets
              </span>
            </Link>
            <Link
              href="/tutores"
              className={`
                px-3 py-2 rounded-lg font-medium transition-colors
                ${isActive('/tutores') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Tutores
              </span>
            </Link>
          </div>

          {/* Auth Button */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Entrar</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          <Link
            href="/"
            className={`
              flex flex-col items-center px-3 py-2 rounded-lg
              ${isActive('/') ? 'text-blue-600' : 'text-gray-600'}
            `}
          >
            <PawPrint className="w-5 h-5" />
            <span className="text-xs mt-1">Pets</span>
          </Link>
          <Link
            href="/tutores"
            className={`
              flex flex-col items-center px-3 py-2 rounded-lg
              ${isActive('/tutores') ? 'text-blue-600' : 'text-gray-600'}
            `}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs mt-1">Tutores</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

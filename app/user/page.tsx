'use client'

import React, { useEffect, useState } from 'react';

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulating an API call
    const fetchUserData = async () => {
      try {
        console.log("start fetchUser")
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  console.log("user=>", user)

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-white-900">User Information</h2>
      </div>

      {user ? (
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white-900">ID</dt>
              <dd className="mt-1 text-sm leading-6 text-white-700 sm:col-span-2 sm:mt-0">{user.id}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white-900">Name</dt>
              <dd className="mt-1 text-sm leading-6 text-white-700 sm:col-span-2 sm:mt-0">{user.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white-900">UserName</dt>
              <dd className="mt-1 text-sm leading-6 text-white-700 sm:col-span-2 sm:mt-0">{user.username}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white-900">Email</dt>
              <dd className="mt-1 text-sm leading-6 text-white-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white-900">Address</dt>
              <dd className="mt-2 text-sm text-white-900sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <span className="truncate font-medium">Street</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="truncate font-medium">{user.address.street}</span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <span className="truncate font-medium">Suite</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="truncate font-medium">{user.address.suite}</span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <span className="truncate font-medium">City</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="truncate font-medium">{user.address.city}</span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <span className="truncate font-medium">Zipcode</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="truncate font-medium">{user.address.zipcode}</span>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white-900">Phone</dt>
              <dd className="mt-1 text-sm leading-6 text-white-700 sm:col-span-2 sm:mt-0">{user.phone}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white-900">Website</dt>
              <dd className="mt-1 text-sm leading-6 text-white-700 sm:col-span-2 sm:mt-0">{user.website}</dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white-900">Company</dt>
              <dd className="mt-2 text-sm text-white-900sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <span className="truncate font-medium">Company Name</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="truncate font-medium">{user.company.name}</span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <span className="truncate font-medium">Catch Phrase</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="truncate font-medium">{user.company.catchPhrase}</span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <span className="truncate font-medium">BS</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="truncate font-medium">{user.company.bs}</span>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserInfo;
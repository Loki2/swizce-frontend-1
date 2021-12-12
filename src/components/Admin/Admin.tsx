import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../graphql/User';
import AdminRow from './AdminRow';
import { User } from '../../types';
import Loader from "react-loader-spinner";
import { isSuperAdmin } from '../../helpers/authHelper';


import AdminSideMenu from '../Partials/AdminSideMenu';

interface Props {
  admin: User
}

const Admin: React.FC<Props> = ({ admin }) => {

  const { data, loading, error} = useQuery<{ users: User[] }>(QUERY_USERS, { fetchPolicy: 'network-only' });

  return loading ? 
    <Loader type='Oval' color='teal' width={50} height={50} timeout={30000} /> 
    : 
    error ? <p>Sorry, something went wrong...!</p>
    : (
      <>
      <AdminSideMenu />
      <div className="display__page">
        <div className="admin__contianer">
            <h3>Permission Management</h3>
            <table>
              <thead>
                <tr>
                  <th rowSpan={2} style={{ width: '15%'}}>Username</th>
                  <th rowSpan={2} style={{ width: '25%'}}>Email</th>
                  <th rowSpan={2} style={{ width: '15%'}}>Create At</th>
                  {
                    isSuperAdmin(admin) &&
                      <>
                        <th colSpan={4} style={{ width: '25%'}}>Roles</th>
                        <th rowSpan={2} style={{ width: '10%'}}>Edit Roles</th>
                      </>
                  }
                </tr>


                {
                    isSuperAdmin(admin) &&
                    <tr>
                      <th>Client</th>
                      <th>Editor</th>
                      <th>Admin</th>
                      <th>Super</th>
                  </tr>
                  }                
              </thead>
              <tbody>
                {
                  data && data.users.map((user) => (
                    <AdminRow admin={admin} user={user} key={user.id}/>
                  ))
                }
              </tbody>
            </table>
          </div>
      </div>
      </>
    )
}

export default Admin

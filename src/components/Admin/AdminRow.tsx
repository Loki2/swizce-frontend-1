import React, { useState, useEffect } from "react";
import { isSuperAdmin } from "../../helpers/authHelper";
import { useMutation } from "@apollo/client";
import { User, Roles } from "../../types";
import { UPDATE_ROLES, DELETE_USER, QUERY_USERS } from "../../graphql/User";
import Loader from "react-loader-spinner";

interface Props {
  user: User;
  admin: User;
}

const AdminRow: React.FC<Props> = ({ user, admin }) => {
  const { roles } = user;
  const initialState = {
    CLIENT: roles.includes("CLIENT"),
    ITEMEDITOR: roles.includes("ITEMEDITOR"),
    ADMIN: roles.includes("ADMIN"),
  };

  const [isEditing, setIsEditing] = useState(false);
  const [roleState, setRoleState] = useState(initialState);

  const [updateRoles, { loading, error }] = 
        useMutation<{ updateRoles: User }, { userId: string; newRoles: Roles[] }>(
          UPDATE_ROLES
        );

  useEffect(() => {
    if (error)
      alert(error.graphQLErrors[0]?.message || "Sorry, Something went wrong");
  }, [error]);

  const handleSubmitUpdateRoles = async (userId: string) => {
    try {
      const newRoles: Roles[] = [];

      //{ITEMEDITOR: true, ADMIN: false }--> [[ITEMEDITOR, true], [ADMIN, false ]]
      Object.entries(roleState).forEach(([k, v]) =>
        v ? newRoles.push(k as Roles) : null
      );

      //Check the user.roles Array has not been change
      if(user.roles.length === newRoles.length) {
        const checkRoles = user.roles.map(role => newRoles.includes(role))


        if(!checkRoles.includes(false)) {
          alert('Notting to be changed...!')
          return
        }
      }


      const response = await updateRoles({ 
        variables: { userId, newRoles }, 
        refetchQueries: [{query: QUERY_USERS}] 
      });

      if (response.data?.updateRoles) {
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(roleState);

  //DELETE USER FROM DATABASE
  const [deleteUser, deleteUserRes] = useMutation<{ deleteUser: {message: string}}, {userId: string}>(DELETE_USER);

  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await deleteUser({ variables: {userId}, refetchQueries: [{query: QUERY_USERS}]});

      if(res.data?.deleteUser.message) {
        alert(res.data?.deleteUser.message)
      }
    } catch (error) {
      alert((error as Error).message)
    }
  }

  useEffect(() => {
    if(deleteUserRes.error) alert(deleteUserRes.error.graphQLErrors[0]?.message)
  }, [deleteUserRes.error])

  return (
    <tr key={user.id}>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.createdAt}</td>

      {/* Management User role Section */}
      {/* Client Role */}
      {
        isSuperAdmin(admin) && <>

      <td
        className="td__role"
        style={{
          background: !isEditing ? "white" : undefined,
          cursor: isEditing ? "pointer" : undefined,
        }}
      >
        <i
          className="ti-check true"
          color="teal"
          style={{ color: "teal", cursor: "not-allowed" }}
        />
      </td>

      {/* item editor Role */}
      <td
        className="td__role"
        style={{
          background: !isEditing ? "white" : undefined,
          cursor: isEditing ? "pointer" : undefined,
        }}
        onClick={
          isEditing
            ? () =>
                setRoleState((prev) => ({
                  ...prev,
                  ITEMEDITOR: !prev.ITEMEDITOR,
                }))
            : undefined
        }
      >
        {roleState.ITEMEDITOR ? (
          <i
            className="ti-check true"
            style={{
              color: !isEditing ? "teal" : undefined,
              cursor: "not-allowed",
            }}
          />
        ) : (
          <i
            className="ti-close true"
            color="red"
            style={{
              color: !isEditing ? "lightgray" : undefined,
              cursor: "not-allowed",
            }}
          />
        )}
      </td>

      {/* Admin Role */}
      <td
        className="td__role"
        style={{
          background: !isEditing ? "white" : undefined,
          cursor: isEditing ? "pointer" : undefined,
        }}
        onClick={
          isEditing
            ? () => setRoleState((prev) => ({ ...prev, ADMIN: !prev.ADMIN }))
            : undefined
        }
      >
        {roleState.ADMIN ? (
          <i
            className="ti-check true"
            style={{
              color: !isEditing ? "teal" : undefined,
              cursor: "not-allowed",
            }}
          />
        ) : (
          <i
            className="ti-close true"
            color="red"
            style={{
              color: !isEditing ? "lightgray" : undefined,
              cursor: "not-allowed",
            }}
          />
        )}
      </td>

      {/* Super Admin Role */}
      <td>
        {isSuperAdmin(user) && (
          <i
            className="ti-check true"
            style={{
              color: !isEditing ? "teal" : undefined,
              cursor: "not-allowed",
            }}
          />
        )}
      </td>

      {/* Actions */}
      { loading ? (
        <td>
          <Loader
            type="Oval"
            color="teal"
            width={30}
            height={30}
            timeout={30000}
          />
        </td>
      ) : isEditing ? (
        <td>
          <p className="role__action">
            <button>
              <i
                className="ti-close true"
                color="red"
                onClick={() => {
                  setRoleState(initialState);
                  setIsEditing(false);
                }}
              />
            </button>
            <button onClick={() => handleSubmitUpdateRoles(user.id)}>
              <i className="ti-check true" />
            </button>
          </p>
        </td>
      ) :  (
        <td>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </td>
      )}

      <td>
        {
          isSuperAdmin(user) ? null :
          <button
            style={{ cursor: !isEditing ? "pointer" : undefined }}
            disabled={isEditing}
            onClick={() => {
              if(!confirm('Are you sure, Want to delete...?')) return

              handleDeleteUser(user.id)
            }}
          >
            {
              deleteUserRes.loading ? 
              <Loader
              type="Oval"
              color="teal"
              width={30}
              height={30}
              timeout={30000}
            />
            : 
            <i className="ti-trash true" style={{ color: "red" }} />
            }
         </button>
        }
      </td>
      </>
     }
    </tr>
    
  );
};

export default AdminRow;

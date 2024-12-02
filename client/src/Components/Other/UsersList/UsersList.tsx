import * as React from "react";
import {
  makeStyles,
  Avatar,
  Tag,
  Input,
  TagGroup,
  SearchBox,
  Button
} from '@fluentui/react-components';

import './UsersList.css';

import { WebApi } from '../../../Scripts/webApi'

let apiUsers: WebApi.User[] = [];

export default function UsersList(props: {
  title: string,
  onChange: (users: WebApi.User[]) => void,
}) {
  const [users, setUsers] = React.useState<WebApi.User[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<WebApi.User[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");

  React.useEffect(() => {
    const loadData = async () => {
      apiUsers = await WebApi.getUsers();

      setUsers(apiUsers);
    }

    loadData();
  }, []);

  const handle_User_Add = (user: WebApi.User) => {
    const selectedUsersUpdated = [...selectedUsers, user];

    setUsers(users.filter(u => u !== user));
    setSelectedUsers(selectedUsersUpdated);
    props.onChange(selectedUsersUpdated);
  }

  const handle_SelectedUser_Remove = (event: any, user: WebApi.User) => {
    const nodeName = event.target.nodeName;

    if (nodeName === 'path' || nodeName === 'svg') {
      const selectedUsersUpdated = selectedUsers.filter(u => u !== user);

      setUsers(apiUsers.filter(u => !selectedUsers.includes(u) || u === user));
      setSelectedUsers(selectedUsersUpdated);
      props.onChange(selectedUsersUpdated);
    }
  }

  const handle_SearchBox_Change = (event: any, data: any) => {
    setSearchText(data.value);
  }

  const searchFilteredUsers = users.filter(u => u.username.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));

  return (
    <div>
      <div style={{ marginLeft: '10px', fontWeight: "lighter" }}>{props.title}</div>
      <div className="users-search-container">
        {selectedUsers?.map(user => (
          <Tag
            dismissible
            key={user.username}
            value={user.username}
            onClick={(e) => handle_SelectedUser_Remove(e, user)}
            media={<Avatar
              color="colorful"
              aria-label={user.username}
              name={user.username}
            />}
          >
            {user.username}
          </Tag>
        ))}
        <SearchBox placeholder="Search" className="users-search" appearance="underline" onChange={handle_SearchBox_Change} />
      </div>

      <div>
        {searchFilteredUsers.map(user => (
          <Button
            className="user-container"
            appearance="subtle"
            icon={<Avatar
              color="colorful"
              aria-label={user.username}
              name={user.username}
            />}
            onClick={() => handle_User_Add(user)} >
            <span className="user">{user.username}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
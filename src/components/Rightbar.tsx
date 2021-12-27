// import React, { Fragment } from 'react';

// () => {
//   const { users, groups, groupCounts } = generateGroupedUsers(500);

//   const { List, ListSubheader, ListItem, ListItemAvatar, Avatar, ListItemText } =
//     MaterialUI;

//   const Components = useMemo(() => {
//     return {
//       List: React.forwardRef(({ style, children }, listRef) => {
//         return (
//           <List
//             style={{ padding: 0, ...style, margin: 0 }}
//             component="div"
//             ref={listRef}
//           >
//             {children}
//           </List>
//         );
//       }),

//       Item: ({ children, ...props }) => {
//         return (
//           <ListItem component="div" {...props} style={{ margin: 0 }}>
//             {children}
//           </ListItem>
//         );
//       },

//       Group: ({ children, style, ...props }) => {
//         return (
//           <ListSubheader
//             component="div"
//             {...props}
//             style={{
//               ...style,
//               backgroundColor: 'var(--ifm-background-color)',
//               margin: 0
//             }}
//           >
//             {children}
//           </ListSubheader>
//         );
//       }
//     };
//   }, []);

//   return (
//     <GroupedVirtuoso
//       groupCounts={groupCounts}
//       components={Components}
//       groupContent={(index) => {
//         return <div>{groups[index]}</div>;
//       }}
//       itemContent={(index) => {
//         const user = users[index];
//         return (
//           <>
//             <ListItemAvatar>
//               <Avatar>{user.initials}</Avatar>
//             </ListItemAvatar>

//             <ListItemText
//               primary={user.name}
//               secondary={<span>{user.description}</span>}
//             />
//           </>
//         );
//       }}
//     />
//   );
// };

const Rightbar = undefined;
export default Rightbar;

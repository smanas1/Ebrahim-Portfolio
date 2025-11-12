/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetAllUsersQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/store/api";

import {
  Plus,
  User as UserIcon,
  Eye,
  Edit,
  Trash2,
  X,
  Users,
  Search,
  Filter,
} from "lucide-react";
import type { User } from "@/types/productTypes";

const UsersPage = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showViewUserModal, setShowViewUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const [userFilter, setUserFilter] = useState<"all" | "admin" | "user" | "moderator">("all");
  const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // Fetch all users from the API
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
    refetch,
  } = useGetAllUsersQuery();

  // Filter users based on search and filter criteria
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesFilter = userFilter === "all" || user.role === userFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Register the user
      await registerUser({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      }).unwrap();

      // Reset the form and close modal
      setNewUser({ name: "", email: "", password: "" });
      setShowAddUserModal(false);

      // Refetch users to update the list
      refetch();
    } catch (error) {
      console.error("Failed to add user:", error);
      // Handle error appropriately
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  const handleViewUser = (user: User) => {
    setViewingUser(user);
    setShowViewUserModal(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUser) return;

    try {
      await updateUser({
        id: editingUser._id,
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
      }).unwrap();

      setShowEditUserModal(false);
      setEditingUser(null);
      refetch();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [name]: value,
      });
    }
  };

  if (usersError) {
    return (
      <div className="space-y-6 bg-background min-h-screen p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">
            Users Management
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-destructive text-lg">Error loading users</p>
          <p className="text-muted-foreground/70 mt-2">
            There was an error fetching the users. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-background min-h-screen p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Users Management</h2>
        <Button onClick={() => setShowAddUserModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search users by name or email..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value as any)}
            className="border border-input rounded-md p-2 bg-background text-foreground focus:ring-primary focus:border-primary"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      {usersLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="h-12 w-12 border-t-2 border-r-2 border-primary rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-foreground">Loading users...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card
              key={user._id}
              className="bg-card rounded-xl shadow-md border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary rounded-full p-2">
                  <UserIcon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-foreground">{user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-primary mt-1 px-2 py-1 bg-primary/10 rounded-full inline-block">
                    {user.role}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="bg-muted p-2 rounded">
                    <div className="text-muted-foreground">ID</div>
                    <div className="font-medium truncate">
                      {user._id.substring(0, 8)}...
                    </div>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <div className="text-muted-foreground">Created</div>
                    <div className="font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {new Date(
                      user.updatedAt || user.createdAt
                    ).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewUser(user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredUsers.length === 0 && !usersLoading && (
            <div className="col-span-full text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">No users found</p>
              <p className="text-muted-foreground/70 mt-2">
                {userSearch || userFilter !== "all"
                  ? "No users match your current filters."
                  : "No users available."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Add New User
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowAddUserModal(false);
                  setNewUser({ name: "", email: "", password: "" });
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  placeholder="Enter user's full name"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Enter user's email"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                  className="w-full"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddUserModal(false);
                    setNewUser({ name: "", email: "", password: "" });
                  }}
                  className="px-4 py-2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2"
                  disabled={isRegistering}
                >
                  {isRegistering ? (
                    <span className="flex items-center">
                      <span className="h-4 w-4 border-t-2 border-r-2 border-primary-foreground rounded-full animate-spin mr-2"></span>
                      Adding...
                    </span>
                  ) : (
                    "Add User"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {showViewUserModal && viewingUser && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                User Details
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowViewUserModal(false);
                  setViewingUser(null);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Full Name
                </h4>
                <p className="text-foreground">{viewingUser.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Email
                </h4>
                <p className="text-foreground">{viewingUser.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Role
                </h4>
                <p className="text-foreground">{(viewingUser as any).role}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  ID
                </h4>
                <p className="text-foreground font-mono">{viewingUser._id}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Created At
                </h4>
                <p className="text-foreground">
                  {new Date(viewingUser.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Updated At
                </h4>
                <p className="text-foreground">
                  {new Date(
                    viewingUser.updatedAt || viewingUser.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowViewUserModal(false);
                  setViewingUser(null);
                }}
                className="px-4 py-2"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && editingUser && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Edit User
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowEditUserModal(false);
                  setEditingUser(null);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleEditInputChange}
                  placeholder="Enter user's full name"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleEditInputChange}
                  placeholder="Enter user's email"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={editingUser?.role || "user"}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser!,
                      role: e.target.value as "user" | "admin" | "moderator",
                    })
                  }
                  className="w-full p-2 border border-input rounded-md focus:ring-primary focus:border-primary bg-background text-foreground"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowEditUserModal(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2"
                >
                  Cancel
                </Button>
                <Button type="submit" className="px-4 py-2">
                  Update User
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
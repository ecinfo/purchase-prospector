import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderOpen,
  Plus,
  Trash2,
  Edit,
  RotateCcw,
  CheckSquare,
  Square,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  fetchProjects,
  setPage,
  resetProjects,
  deleteProject,
  deleteAllProjects,
} from "../../../store/slices/procuremnetSlice";
import { Button } from "../../ui/Button";
import { Card, CardContent } from "../../ui/Card";

const ProjectsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { projects, isLoading, error, next, page } = useAppSelector(
    (state) => state.procurement
  );

  const token =
    useAppSelector((state) => state.auth.token) ||
    localStorage.getItem("token");

  /* -----------------------------
     Selection State
  ----------------------------- */
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const allSelected =
    projects.length > 0 && selectedIds.length === projects.length;

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : projects.map((p) => p.id));
  };

  /* -----------------------------
     Initial Load
  ----------------------------- */
  useEffect(() => {
    if (!token) return;

    dispatch(resetProjects());
    dispatch(setPage(1));
    dispatch(fetchProjects({ token, page: 1 }));
  }, [dispatch, token]);

  /* -----------------------------
     Load More
  ----------------------------- */
  const handleLoadMore = () => {
    if (!next || isLoading) return;

    const nextPage = page + 1;
    dispatch(setPage(nextPage));
    dispatch(fetchProjects({ token: token!, page: nextPage }));
  };

  /* -----------------------------
     API Integrated Actions
  ----------------------------- */

  // Delete single project
  const handleDeleteSingle = async (id: number) => {
    if (!token) return;

    await dispatch(deleteProject({ id, token }));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  // Delete selected projects
  const handleDeleteSelected = async () => {
    if (!token || selectedIds.length === 0) return;

    await Promise.all(
      selectedIds.map((id) => dispatch(deleteProject({ id, token })))
    );

    setSelectedIds([]);
  };

  // Delete all projects
  const handleDeleteAll = async () => {
    if (!token || selectedIds.length === 0) return;

    await dispatch(
      deleteAllProjects({
        ids: selectedIds,
        token,
      })
    );

    setSelectedIds([]);
  };

  const handleRestore = (id: number) => {
    console.log("Restore API not implemented yet:", id);
  };

  return (
    <div className="min-h-screen px-6 py-8 text-white bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Procurement Projects</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage procurement workflow projects
          </p>
        </div>

        <Button
          onClick={() => navigate("/procurement")}
          className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 text-white" />
          New Project
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-3 p-3 mb-6 bg-gray-900 border border-gray-800 rounded">
          <span className="text-sm text-gray-400">
            {selectedIds.length} selected
          </span>

          <Button
            size="sm"
            onClick={handleDeleteSelected}
            className="flex items-center gap-1 text-white bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 text-white" />
            Delete Selected
          </Button>

          <Button
            size="sm"
            onClick={handleDeleteAll}
            className="text-white bg-gray-800 hover:bg-gray-700"
          >
            <Trash2 className="w-4 h-4 text-white" />
            Delete All
          </Button>
        </div>
      )}

      {/* Loading */}
      {isLoading && page === 1 && (
        <p className="text-sm text-gray-400">Loading projects...</p>
      )}

      {/* Error */}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {/* Empty */}
      {!isLoading && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FolderOpen className="w-10 h-10 mb-3 text-white" />
          <p>No projects found</p>
        </div>
      )}

      {/* Select All */}
      {projects.length > 0 && (
        <button
          onClick={toggleSelectAll}
          className="flex items-center gap-2 mb-4 text-sm text-gray-400 hover:text-white"
        >
          {allSelected ? (
            <CheckSquare className="w-4 h-4 text-white" />
          ) : (
            <Square className="w-4 h-4 text-white" />
          )}
          Select All
        </button>
      )}

      {/* Project Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="relative bg-gray-900 border border-gray-800 hover:border-blue-600"
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleSelect(project.id)}
              className="absolute text-white top-3 left-3"
            >
              {selectedIds.includes(project.id) ? (
                <CheckSquare className="w-4 h-4 text-white" />
              ) : (
                <Square className="w-4 h-4 text-white" />
              )}
            </button>

            <CardContent
              className="p-5 cursor-pointer"
              onClick={() => navigate(`/procurement/${project.id}`)}
            >
              <h3 className="mb-1 text-lg font-semibold text-white truncate">
                {project.name}
              </h3>
              <p className="text-sm text-white line-clamp-2">
                {project.description || "No description"}
              </p>
            </CardContent>

            {/* Card Actions */}
            <div className="flex justify-end gap-2 px-4 pb-4">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:text-white"
                onClick={() => navigate(`/procurement/${project.id}/edit`)}
              >
                <Edit className="w-4 h-4 text-white" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:text-white"
                onClick={() => handleRestore(project.id)}
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:text-white"
                onClick={() => handleDeleteSingle(project.id)}
              >
                <Trash2 className="w-4 h-4 text-white" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {next && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="text-white bg-gray-800 hover:bg-gray-700"
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FolderOpen, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  fetchProjects,
  setPage,
  resetProjects,
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

  return (
    <div className="min-h-screen px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">
            Procurement Projects
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            All projects created under procurement workflow
          </p>
        </div>

        <Button
          onClick={() => navigate("/procurement")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Loading */}
      {isLoading && page === 1 && (
        <p className="text-sm text-gray-400">Loading projects...</p>
      )}

      {/* Error */}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {/* Empty */}
      {!isLoading && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FolderOpen className="w-10 h-10 mb-3" />
          <p>No projects found</p>
        </div>
      )}

      {/* Project Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="transition bg-gray-900 border border-gray-800 cursor-pointer hover:border-blue-600"
            onClick={() => navigate(`/procurement/${project.id}`)}
          >
            <CardContent className="p-5">
              <h3 className="mb-1 text-lg font-semibold text-gray-100 truncate">
                {project.name}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2">
                {project.description || "No description"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {next && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="bg-gray-800 hover:bg-gray-700"
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;

import { useNavigate, useParams } from "react-router-dom";
import { projectList } from "../helper/projectList";
import { useEffect, useState } from "react";
import Button from "./Button";

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        setProject(projectList.find((project) => project.id == Number(id)));
    }, []);
    return project ? (
        <>
            <ProjectInfo project={project} imagePath={project.logo} />
        </>
    ) : (
        <ProjectNotFound />
    );
};

const ProjectInfo = ({ project, imagePath }) => {
    return <ProjectNotFound />;
};

const ProjectNotFound = () => {
    const navigate = useNavigate();

    return (
        <main className="container grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-primary">404</p>
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Project not found :{"("}
                </h1>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button
                        text={"Projects"}
                        action={() => navigate("/projects")}
                    />
                </div>
            </div>
        </main>
    );
};

export default Project;

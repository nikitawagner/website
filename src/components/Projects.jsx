import { useNavigate } from "react-router-dom";
import { projectList } from "../helper/projectList";

const Projects = () => {
    const navigate = useNavigate();
    return (
        <div className="container bg-white">
            <h1 className="mb-1 mt-2 text-center text-4xl font-bold text-primary">
                Projects
            </h1>
            {projectList.map((project) => {
                return (
                    <div
                        className="animation m-3 rounded-lg bg-gray-50 p-3 duration-150 
                        hover:scale-101 hover:shadow-[5px_5px_0px_0px_rgba(100,108,255)]"
                        id={project.id}>
                        <h2 className="mb-1 mt-2 text-2xl font-bold text-secondary">
                            {project.name}
                        </h2>
                        <p className="text-gray-600">
                            {project.descriptionShort}
                        </p>
                        <h3 className="mb-1 mt-2 text-xl font-bold text-secondary">
                            Technologies
                        </h3>
                        <p className="text-gray-600">
                            {project.technologies.join(", ")}
                        </p>
                        <div
                            className="text-l mt-3 font-bold text-secondary hover:cursor-pointer"
                            onClick={() => navigate(`/projects/${project.id}`)}>
                            Learn more {">"}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Projects;

import { useNavigate } from "react-router-dom";
import { projectList } from "../helper/projectList";

const Projects = () => {
    const navigate = useNavigate();
    return (
        <div className="container bg-white">
            <h1 className="mb-3 mt-2 text-center text-4xl font-bold text-primary">
                Projects
            </h1>
            <div className="flex flex-row flex-wrap justify-around">
                {projectList.map((project) => {
                    return (
                        <div
                            className="animation m-2 my-3 w-[300px] rounded-lg bg-gray-100 p-3
                        duration-150 hover:scale-101 hover:shadow-[5px_5px_0px_0px_rgba(100,108,255)]"
                            key={project.id}>
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
                            {project.active ? (
                                <div
                                    className="text-l mt-3 font-bold text-secondary hover:cursor-pointer"
                                    onClick={() => {
                                        project.id != 99
                                            ? navigate(
                                                  `/projects/${project.link}`
                                              )
                                            : window.open(
                                                  project.link,
                                                  "_blank"
                                              );
                                    }}>
                                    Learn more {">"}
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Projects;

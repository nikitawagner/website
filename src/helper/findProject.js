import { projectList } from "./projectList";

export default function findProject(id) {
    return projectList.find((project) => project.id === id);
}

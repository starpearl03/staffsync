package com.example.demo.services;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Project;
import com.example.demo.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public Project create(Project project){
        return this.projectRepository.save(project);
    }

    public List<Project> fetchAll(){
        return this.projectRepository.findAll();
    }

    public Project findById(Long id){
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project with id " + id + " does not exist"));
    }

    public Project updateById(Long id, Project project){
        Project projectDb = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project with id " + id + " does not exist"));

        if(project.getTitle() != null && !project.getTitle().isEmpty())
            projectDb.setTitle(project.getTitle());

        if(project.getDescription() != null && !project.getDescription().isEmpty())
            projectDb.setDescription(project.getDescription());

        // Update tasks if needed
        // Since tasks are managed from TaskService, no changes are needed here

        return this.projectRepository.save(projectDb);
    }

    public Boolean delete(Long id){
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project with id " + id + " does not exist"));

        projectRepository.delete(project);

        return Boolean.TRUE;
    }
}

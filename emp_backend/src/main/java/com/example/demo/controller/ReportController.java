package com.example.demo.controller;

import com.example.demo.model.Report;
import com.example.demo.services.ReportService;
import com.itextpdf.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/report")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    // Create
    @PostMapping("/generate/{employeeId}")
    public ResponseEntity<Report> create(@PathVariable Long employeeId){
        return ResponseEntity.ok()
                .body(
                        this.reportService.generateReportForEmployee(employeeId)
                );
    }

    // Fetch all
    @GetMapping("/")
    public ResponseEntity<List<Report>> fetchAll(){
        return ResponseEntity.ok()
                .body(
                        this.reportService.fetchAll()
                );
    }

    // Fetch by id
    @GetMapping("/{id}")
    public ResponseEntity<Report> fetchById(@PathVariable Long id){
        return ResponseEntity.ok()
                .body(
                        this.reportService.findById(id)
                );
    }

    // Delete by id
    @DeleteMapping("/{id}")
    public ResponseEntity <Map<String, Boolean>>  delete(@PathVariable Long id){
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", this.reportService.delete(id));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/exportToCsv/{employeeId}")
    public ResponseEntity<String> exportToCsv(
            @PathVariable Long employeeId
            ) throws IOException {
        return ResponseEntity.ok()
                .body(this.reportService.exportReportAsCSV(employeeId));
    }

    @PostMapping("/exportToPdf/{employeeId}")
    public ResponseEntity<String> exportToPdf(
            @PathVariable Long employeeId
            ) throws IOException, DocumentException {
        return ResponseEntity.ok()
                .body(this.reportService.exportReportAsPDF(employeeId));
    }
}

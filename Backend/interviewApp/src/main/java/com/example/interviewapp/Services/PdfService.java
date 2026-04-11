package com.example.interviewapp.Services;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class PdfService {
    public String extractTextFromPdf(String filePath) {
        try (PDDocument document = PDDocument.load(new File(filePath))) {

            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);

        } catch (IOException e) {
            throw new RuntimeException("Failed to read PDF", e);
        }
    }
}

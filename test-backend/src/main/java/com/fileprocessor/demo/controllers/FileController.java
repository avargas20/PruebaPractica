package com.fileprocessor.demo.controllers;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@RestController
public class FileController {

    @PostMapping(value = "/upload",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE} )
    public String upload(MultipartFile file) {
        try {

            InputStream stream = file.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
            JSONArray response = new JSONArray();

            while(reader.ready()) {
                String line = reader.readLine();
                JSONObject json = new JSONObject();

                String split1[] = line.split(":");
                String split2[] = split1[1].split("→");
                json.put("hora", split1[0].trim());
                json.put("minutos", split2[0].trim());
                json.put("resultado", split2[1].trim());
                response.put(json);
            }
            return response.toString();
        } catch (IOException | JSONException e) {
            e.printStackTrace();
            return "Error";
        }
    }
}
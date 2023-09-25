package tn.esprit.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.Dtos.AttachmentDto;
import tn.esprit.Entitys.Attachment;
import tn.esprit.Mappers.AttachmentMapper;
import tn.esprit.Services.IAttachmentService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/attachment")
public class AttachmentController {

    private final IAttachmentService attachmentService;
    @Autowired
    public AttachmentController(IAttachmentService   attachmentService) {
        this.attachmentService = attachmentService; }



    /*@PostMapping("/upload")//(@RequestParam("file")MultipartFile[]files)
    public AttachmentDto uploadFile(@RequestParam("file")MultipartFile file) throws Exception {
        Attachment attachment = attachmentService.saveAttachment(file);
        return  AttachmentMapper.mapToDto( attachment  );
    }
    @PutMapping ("/upload-to-account/{idAccount}")//(@RequestParam("file")MultipartFile[]files)
    public AttachmentDto uploadFileAccount(@RequestParam("file")MultipartFile file, @PathVariable("idAccount")   Long idAccount) throws Exception {
        Attachment attachment = attachmentService.saveFileToAccount(file,idAccount);
        return  AttachmentMapper.mapToDto( attachment  );
    }
    @PutMapping ("/photo-profile-to-account/{username}")
    public AttachmentDto updatePhotoProfileToAccount(@RequestParam("file")MultipartFile file, @PathVariable("username")   String username) throws Exception {
        Attachment attachment = attachmentService.savePhotoProfileToAccount(file,username);
        return  AttachmentMapper.mapToDto( attachment  );
    }
    @PutMapping ("/cover-profile-to-account/{username}")
    public AttachmentDto updateCoverProfileToAccount(@RequestParam("file")MultipartFile file, @PathVariable("username")   String username) throws Exception {
        Attachment attachment = attachmentService.saveCoverProfileToAccount(file,username);
        return  AttachmentMapper.mapToDto( attachment  );
    }*/
    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) throws Exception {
        Attachment attachment = null;
        attachment = attachmentService.selectById(fileId);
        return  ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(attachment.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + attachment.getFileName()
                                + "\"")
                .body(new ByteArrayResource(attachment.getData()));
    }

    /*@GetMapping("/last-photo-account/{idAccount}")
    public AttachementDto getLastPhoto (@PathVariable long idAccount ) {
        Attachment attachment = attachmentService.getLastPhoto(idAccount);
        return  AttachmentMapper.mapToDto( attachment  );
    }
    @GetMapping("/account-and-catrgory/{idAccount}/{category}")
    public  List<AttachementDto> getByAccountAndCatrgory (@PathVariable("idAccount") long idAccount ,@PathVariable("category") Category category ) {
       List<Attachment> attachments = attachmentService.selectByAccountAndCatrgory(idAccount , category);
        return attachments.stream().map(attachment -> AttachmentMapper.mapToDto(attachment)) .collect(Collectors.toList());
    }*/
}

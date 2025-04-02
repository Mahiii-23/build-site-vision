
import { format } from "date-fns";
import { File, FileText, Trash2, ImageIcon } from "lucide-react";
import { DataCard } from "@/components/ui/data-card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ProjectDocumentsProps {
  documents: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    date: string;
  }>;
}

export const ProjectDocuments = ({ documents }: ProjectDocumentsProps) => {
  return (
    <DataCard title="Project Documents">
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm">
            <File className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map(doc => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="uppercase">
                    {doc.type}
                  </Badge>
                </TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>{format(new Date(doc.date), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DataCard>
  );
};

import { PartialType } from "@nestjs/mapped-types"
import CreateNoteDto from "./create.note.dto"

export default class UpdateNoteDto extends PartialType(CreateNoteDto) {}
import { User, Note, SharedNote } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';
import { v4 as uuidv4 } from 'uuid';

export const getAll = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 10;

    const notes = await req.user.getNotes({
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * limit,
      limit,
    });

    return successResponse(req, res, { notes });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const get = async (req, res) => {
  try {
    const { userId } = req.user;
    const { uuid } = req.params;
    
    const user = await User.findOne({ where: { id: userId } });
    const note = await user.getNote({
      where: {
        uuid
      }
    });
    
    return successResponse(req, res, { note });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

export const add = async (req, res) => {
  try {
    const { userId } = req.user;
    const { content } = req.body;

    const user = await User.findOne({
      where: { id: userId }
    });
    const note = await user.createNote({
      uuid: uuidv4(),
      content
    });
    
    return successResponse(req, res, { note });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

export const edit = async (req, res) => {
  try {
    const { uuid, content } = req.body;
    const { userId } = req.user;
    
    const user = await User.findOne({ where: { id: userId } });
    let note = await user
      .getNote({ where: { uuid } });

    if (!note) errorResponse(req, res, 'The note wasn\'t not found for this user');
      
    note = await note.update({ content });

    return successResponse(req, res, { note });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

export const remove = async (req, res) => {
  try {
    const { uuid } = req.body;
    const { userId } = req.user;
    
    const user = await User.findOne({ where: { id: userId } });
    let note = await user
      .getNote({ where: { uuid } });

    if (!note)
      return errorResponse(req, res, 'The note wasn\'t not found for this user');
      
    note = await note.delete();

    return successResponse(req, res, { note });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

export const share = async (req, res) => {
  try {
    const { uuid } = req.body;
    const { userId } = req.user;
    
    const user = await User.findOne({ where: { id: userId } });
    const note = await user.findOneNote({
      where: { uuid }
    });
    
    const sharedNote = await note.createSharedNote({
      uuid: uuidv4()
    });
    
    return successResponse(req, res, { sharedNote });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

export const getShared = async (req, res) => {
  try {
    const { uuid: sharedUuid } = req.params;
    console.log(req.params)

    const sharedNote = await SharedNote.findOne({
      where: { uuid: sharedUuid },
      include: Note
    });

    if (!sharedNote) 
      return errorResponse(req, res, 'No shared notes found');

    return successResponse(req, res, { note: sharedNote.note })
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}
import Workspace from "../models/workspace.js";
import Project from "../models/projects.js";

const createWorkspace= async (req, res) => {
  try {
    const {name, description, color} = req.body;
    const workspace = await Workspace.create({
      name,
      description,
        color,
        owner: req.user._id,
        members: [{
            user: req.user._id,
            role: "owner",
            joinedAt: new Date(),
        }],
    });
    res.status(201).json(workspace);
  } catch (error) {
    console.error("Error creating workspace:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      'members.user': req.user._id
    }).populate('owner', 'name email').lean();
    
    res.status(200).json(workspaces);
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getWorkspaceDetails = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const workspace = await Workspace.findOne({
      _id: workspaceId,
      'members.user': req.user._id
    }).populate("members.user", "name email profilePicture")
      .populate("owner", "name email");
      
    if(!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    res.status(200).json(workspace);
  }
  catch (error) {
    console.error("Error fetching workspace details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


const getWorkspaceProjects = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await Workspace.findOne({
      _id: workspaceId,
      "members.user": req.user._id,
    }).populate("members.user", "name email profilePicture");

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

       const projects = await Project.find({
      workspace: workspaceId,
      isArchived: false,
      members: { $elemMatch: { user: req.user._id } },
    })
      .populate("tasks", "status")
      .sort({ createdAt: -1 });

    res.status(200).json({ projects, workspace });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


export {createWorkspace, getWorkspaces, getWorkspaceDetails, getWorkspaceProjects};
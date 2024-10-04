const projects = require('../Models/projectSchema')
//add a new project
exports.addProject = async (req, res) => {
    console.log("inside the project controller");
    const userId = req.payload;
    console.log("userId:", userId);
    const projectImage = req.file.filename
    console.log("image file name", projectImage);


    const { title, language, github, website, overview } = req.body;
    try {
        const existingproject = await projects.findOne({ github: github });
        if (existingproject) {
            res.send(409).json("project already exist")
        }
        else {
            console.log("0")
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId
            })
            await newProject.save()
            res.status(200).json("project uploaded successfully")
        }
    }
    catch (err) {
        res.send(401).json("project upload failed", err)
    }
}
//get any 3 projects for home page 
exports.getHomeProject = async (req, res) => {
    console.log("inside get home project controller");

    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    }
    catch (err) {
        res.send(401).json("request failed due to: ", err)
    }
}
//get all project
exports.getAllProject = async (req, res) => {
    const searchKey = req.query.search;
    console.log(searchKey);
    const searchQuery = {
        $or: [
            {
                language: {
                    // i is used to remove case sensitivity
                    $regex: searchKey,
                    $options: 'i'
                },
                title: {
                    $regex: searchKey,
                    $options: 'i'
                }
            }
        ]
    }

    try {
        const allProject = await projects.find(searchQuery);
        res.status(200).json(allProject)
    }
    catch (err) {
        res.send(401).json("request failed due to: ", err)
    }
}
//get all projects uploaded by specific user
exports.getUserProject = async (req, res) => {
    userId = req.payload;
    try {
        const allUserProject = await projects.find({ userId: userId });
        res.status(200).json(allUserProject)
    }
    catch (err) {
        res.send(401).json("request failed due to: ", err)
    }
}



//edit usre projects 


exports.editUserProject = async (req, res) => {
    console.log("inside project controller")
    const { id } = req.params;
    const userId = req.payload;
    const { title, language, github, website, overview, projectImage } = req.body;
    const uploadedProjectImage = req.file ? req.file.filename : projectImage;
    try {
        const updateProject = await projects.findByIdAndUpdate(
            { _id: id }, {
            title: title,
            language: language,
            github: github,
            website: website,
            overview: overview,
            projectImage: uploadedProjectImage,
            userId: userId
        },
            {
                new: true
            }
        );
        await updateProject.save();
        res.status(200).json(updateProject)
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//for delete the project

exports.deleteprojects = async (req,res)=>{
    console.log("inside the delete controller")
    const {id}=req.params;
    try{
        const deletedProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(deletedProject)

    }
    catch(err){
        res.status(401).json(err)
    }
}
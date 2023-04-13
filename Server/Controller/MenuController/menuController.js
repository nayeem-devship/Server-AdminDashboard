import UserMenuDb from "../../Model/AdminModels/menuModel.js";

export async function createMenu(req, res, next){
    try{
        const data = req.body;
        const details = {
            role: data.role,
            menuName: data.menuName,
            menuIcon: data.menuIcon,
            path: data.path,
            userId: data.userId
        }
        const createMenu = await UserMenuDb.create(details);
        res.status(200).json({
            message:"Menus Created Successfully",
            data:createMenu,
        });
    }
    catch(err){
        console.log(err);
        next();
    }
}

export async function getAllMenu(req, res, next){
    try{
        const getMenuList = await UserMenuDb.find();
        res.status(200).json({
            message:"get successfully",
            data: getMenuList,
        });
    }
    catch(err){
        next();
    }
}

export async function getMenuById(req, res, next){
    try{
        const userId = req.params.userId;
        const getMenuList = await UserMenuDb.find({userId});
        res.status(200).json({
            message:"get successfully",
            data:getMenuList,
        });
    } catch(err){
        next();
    }
}

export async function getMenuByRole(req, res, next){
    try{
        const role = req.params.role;
        const getMenuList = await UserMenuDb.find({role});
        res.status(200).json({
            message:"get successfully",
            data:getMenuList,
        });
    } catch(err){
        next();
    }
}

export async function updateMenu(req, res, next){
    try{
        const data = req.params;
        const id = data.id;
        const details = {
            role: data.role,
            menuName: data.menuName,
            menuIcon: data.menuIcon,
            path: data.path,
            userId: data.userId
        }
        const updateMenu = await UserMenuDb.findByIdAndUpdate(id, details, {
            new: true,
        })
        res.status(200).json({
            message:"Menus Updated Successfully",
            data:updateMenu,
        });
    }
    catch(err){
        console.log(err);
        next();
    }
}

export async function deleteMenu (req, res, next){
    try{
        const data = req.params;
        menuId = data.id;
        const deleteMenu = await UserMenuDb.findByIdAndDelete(menuId);
        res.status(200).json({
            message:"deleted successfully",
            data:deleteMenu,
        });
    }
    catch(err){
        next();
    }
}
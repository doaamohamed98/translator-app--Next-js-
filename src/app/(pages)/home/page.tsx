"use client";
import {AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
   Divider,
   Box,Button,
   Tab,
   Tabs,
   Dialog, DialogTitle, DialogContent, DialogActions,TextField,
   MenuItem,
   Select,
   FormControl,
   InputLabel,
   Chip,
   Card,
   CardContent,
   TableContainer,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody
  } from "@mui/material";
import { NextPage } from "next";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosLogIn, IoMdAdd } from "react-icons/io";
import logo from "@/Assets/cha-translate-2-svgrepo-com.svg"
import { CiMenuBurger } from "react-icons/ci";
import Image from "next/image";
import  styles from "./style.module.scss"
import { MdDelete } from "react-icons/md";
import { createProject, deleteProject, getAllProjects, getProjectsById } from "@/app/Services/ProjectsServices";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm , Controller, set} from "react-hook-form";
import { getLanguages } from "@/app/Services/LanguagesServices";
import { toast } from "react-toastify";
import { createTranslatProject,
   getOneLanguage,
   getAllTranslation,
    DeleteTranslation, 
    UpdateTranslation} from "@/app/Services/DictionariesServices";
import { FaCheckSquare } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { useQuery, useQueryClient,useMutation } from 'react-query';
import { schemaCreateProject } from "@/app/Utils/ProjectValidation";
import { schemaCreateTranslation } from "@/app/Utils/TranslationValidation";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GiClick } from "react-icons/gi";


interface FormValues {
  title:string;
  targetLanguages:string[];
}

interface TranslatData {
  key: string;
  text: string;
}

interface UpdateDataForm{
  key:string;
  text: string;
  UpdateLanguages: string[];
}
const Page: NextPage = ({}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  // const [selectedLanguageValue, setSelectedLanguageValue] = useState<any>(null);
  const { data: Allprojects} = useQuery('Allprojects', getAllProjects);
  const { data: Languages } = useQuery('Languages', getLanguages);
  // const [languageCode, setLanguageCode] = useState('')
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);


const [value, setValue] =useState(0);
  const handleLogout = () => {
    Cookies.remove("authToken");
    router.push("/sign-in");
  };

  const schemaUpdate = yup.object({
    key: yup.string().required('Key is required'),
    text: yup.string().required('Text is required'),
    UpdateLanguages: yup.array().min(1).required('At least one language is required'),
  }).required();


  
 const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
 const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const { control, handleSubmit, reset ,formState: { errors }} = useForm<FormValues>({
    resolver: yupResolver(schemaCreateProject),
    defaultValues: {
      title: '',
      targetLanguages:[],
    },
  });

  const { register:update, handleSubmit:handleSubmitUpdate} = useForm<UpdateDataForm>({
    resolver: yupResolver(schemaUpdate),
    defaultValues: {
      key:'',
     text: '',
    UpdateLanguages:[]
    },
  });

  const { register, handleSubmit: handleTranslationSubmit,} = useForm<TranslatData>({
    resolver: yupResolver(schemaCreateTranslation),
    defaultValues: {
      key: '',
      text: '',
    },
  });

  

//CreateNewProject
const { mutate: CreateNewProject} = useMutation(
  (data: FormValues) => createProject(data),
  {
    onSuccess: () => {
      queryClient.invalidateQueries('Allprojects');
      setDialogOpen(false);
      reset();
      toast.success('Project created successfully!');
    },
    onError: (error: any) => {
      console.error("Error creating project:", error);
      toast.error(error.response?.data?.message || 'An error occurred')
    }
  }
);
const onCreateProject = async (data: FormValues) => {
  CreateNewProject(data);
};
//Get Project By ID 
const getProjectById = async (projectId: string) => {
  const data = await getProjectsById(projectId);
  setSelectedProject(data)
  return data;
}

//Delete Project 
const mutation = useMutation({
  mutationFn: deleteProject,
  onSuccess: () => {
    queryClient.invalidateQueries('Allprojects');
  },
  onError: (error) => {
    console.error('Failed to delete project:', error);
  },
});
const handleDeleteProject = async (projectId: string) => {
  mutation.mutate(projectId)
};

const handleTranslation = (data: TranslatData) => createTranslatProject(data, selectedProject._id);
const { mutate: createTranslation } = useMutation(handleTranslation, {
  onSuccess: () => {
    toast.success('Translation created successfully!')
    queryClient.invalidateQueries('allTranslation')
  },
  onError: (error: any) => {
    console.error("Error creating Translation:", error);
    toast.error(error.response?.data?.message || 'An error occurred')
  }
});

const TranslationSubmit = (data: TranslatData) => {
  createTranslation(data);
  reset();
};

//Get One LanguageTranslation
  const TranslationOneLanguage = async ( selectedProjectid:string,languageCode: string) =>{
    try{
     const language = await getOneLanguage(selectedProjectid, languageCode);
     console.log("TranslationOneLanguage ",language, languageCode )
    // setLanguageCode(languageCode)
    // setSelectedLanguageValue(language)
    return language;
    }catch (error :any){
      toast.error("Not Found Translation,Please selecte the project")
    }

  }
  
  const AllTranslation = async (projectId: string) => {
    return await getAllTranslation(projectId);
  };
  
  const { data: translations,} = useQuery(
    ["allTranslation", selectedProject?._id],
    () => AllTranslation(selectedProject?._id),
    {
      enabled: !!selectedProject,
      onSuccess: (data) => {
        console.log("allTranslation", data); 
      },
      onError: (error:any) => {
        toast.error(error.response?.data?.message || 'An error occurred');
      },
    }
  );


  const handelDeleteTranslation = async (projectId: string , id: string) => {
    try{
     const data = await DeleteTranslation(projectId ,id );
     queryClient.invalidateQueries(["allTranslation",]);
    return data;
    }catch(error:any){
     console.log(error)
    }
   
  }
  

  const SubmitUpdate= async (projectId: string ,id: string ,dataUpdate:UpdateDataForm) => {
    try{
     const data = await UpdateTranslation(projectId, id , dataUpdate);
     queryClient.invalidateQueries("allTranslation");
     console.log(data)
      return data;
    }catch(error:any){
      toast.error(error.response?.data?.message || 'An error occurred')
    }
  }
  
  const drawerContent = (
    <Box className={styles.sidebarContainer} >
      <Box className={styles.logoContainer}>
        <Image src={logo} alt="Logo" width={40}/>
        <Typography variant="h6" className={styles.text}>
          Translator
        </Typography>
      </Box>
      <Divider /> 
      <Box >
       <Button variant="contained" startIcon={<IoMdAdd/>} onClick={() => setDialogOpen(true)}>
        Project
      </Button>
      </Box>
   
      
      <List className={styles.projectList} >
      {Allprojects?.map((project:any) => (
          <ListItem button key={project._id} onClick={() => getProjectById(project._id)} >
            <ListItemText primary={project.title} />
            <ListItemIcon  >
             {/* <MdEdit /> */}
            </ListItemIcon>
            <ListItemIcon >
              <MdDelete  onClick={() => handleDeleteProject(project._id)}/>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>  

      <Divider />
      <List className={styles.footerList}>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <IoIosLogIn />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div> 
      <AppBar  sx={{backgroundColor:"white" , color:"black",
      width: { sm: "calc(100% - 230px)" },
      ml: { sm: "250px" },
      }} >
        <Divider />
        <Toolbar>
          <Box className={styles.toolbar}>
            <Box  className={styles.logoImage}>
              <Image src={logo} alt="Logo" width={40} />
            </Box>
        
        <Typography variant="h6">
          Translator
          <Typography variant="caption" className={styles.subtitle}>
          Free online translator enhanced by dictionary
          </Typography>
        </Typography>
       
         </Box>
         <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 , display:{sm:"block" , md:"none"}}}
          >
            <CiMenuBurger />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="temporary"
          open={isOpen}
          onClose={toggleDrawer(false)}
          ModalProps={{
            keepMounted: true, 
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block"}}}
          open
        >
          {drawerContent}
        </Drawer>

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, minHeight: "calc(100vh - 64px)", marginLeft: { sm: "250px", xs: "0" } }}
        >
          <Toolbar />
          <Box sx={{display:"flex" , alignItems:"center" , justifyContent:"center" ,flexDirection:"column"}}>
          <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
               <Tab label="LANGUAGES" />
                <Tab label="Translations" />
            </Tabs>
          </Box>

          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
          <DialogTitle> Create New Project </DialogTitle>
            <DialogContent >
            <form onSubmit={handleSubmit(onCreateProject)}>
              <FormControl fullWidth sx={{ marginBottom: 2}}>
                <InputLabel >Languages</InputLabel>
                    <Controller
                   name="targetLanguages"
                   control={control}
                   render={({ field, fieldState: { error } }) => (
                   <>
                    <Select 
                   {...field}
                   multiple
                   renderValue={(selected) => (
                  <Box>
                    {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {Languages.map((language:any) => (
              <MenuItem key={language.code} value={language.code}>
                {language.name}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <Typography variant="body2" color="error">
              {error.message}
            </Typography>
          )}
          </>
      )}
    />
              </FormControl>

               <FormControl fullWidth sx={{ marginBottom: 2 }}>
    <TextField
      label="Project Title"
      variant="outlined"
      fullWidth
      {...control.register("title", { required: "Project title is required." })}
      error={!!errors.title}
      helperText={errors.title?.message}
    />
   </FormControl>
    <DialogActions>
    <Button onClick={() => setDialogOpen(false)} color="secondary">
      Cancel
    </Button>
    <Button type="submit" variant="contained">
     Create 
    </Button>
           </DialogActions>
          </form>
          </DialogContent>
          </Dialog>

    {value === 0 && (
    <Box  sx={{ textAlign: "center", mt: 2 }}>
       {selectedProject ?(
            <Box >
              <Box className={styles.cardContainer}>
              {selectedProject.targetLanguages.map((language: any) => (
              <Card key={language.code} className={styles.Card}
              onClick={()=> TranslationOneLanguage( selectedProject._id ,language.code)}
              >
                <CardContent className={styles.CardContent} >
                  <Typography>
                    {language.name}
                  </Typography>
                  <Typography>
                  ({language.code})  
                  </Typography>
                  {/* <Typography>
                  <GiClick/>
                  </Typography> */}
                </CardContent>
              </Card>
            ))}
          </Box>
          {/* {selectedLanguageValue&& (
        <Box sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Name Project</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Languages</TableCell>
                <TableCell>Translation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(selectedLanguageValue).map(([key, value]: [string, any]) => (
                <TableRow key={key}>
                  <TableCell>{selectedProject.title}</TableCell>
                  <TableCell>{key}</TableCell>
                  <TableCell>{languageCode}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </Box>
      )} */}
          </Box>
          ) : (
            <Typography variant="body1"> Select a project to view Languages</Typography>
          )}

          

    </Box>
    
  )}  
     {value === 1 && (
    <Box  sx={{ textAlign: "center", mt: 2 }}>
      <form onSubmit={handleTranslationSubmit(TranslationSubmit)}>
      <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" >
        <TableHead>
          <TableRow className={styles.TableRow}>
            <TableCell>Key</TableCell>
            <TableCell >Text</TableCell>
            <TableCell>Translation</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
        <TableCell>
        <TextField {...register("key")}  variant="outlined" size="small" placeholder="Key" />
        </TableCell>
          <TableCell >
            <TextField {...register("text")} variant="outlined" size="small" placeholder="Text" />
            </TableCell>
            <TableCell> 
              <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between" , gap:2}}>
                <Button type="submit" variant="contained">
                  {/* <FaCheckSquare/> */}
                  Submit
                </Button>
                <Button type="reset" onClick={() => reset()} variant="contained">
                {/* <GrPowerReset /> */}
                Reset
                </Button>
              </Box>
             </TableCell>
        </TableBody>
      </Table>
      </TableContainer>
      </form>

      {selectedProject && translations && (
  <Box sx={{ textAlign: "center",}}>
    <Typography> Project name : {selectedProject.title}</Typography>
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow className={styles.TableRow}>
            <TableCell>Key</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Text</TableCell>
            <TableCell>Languages</TableCell>
            <TableCell>Translations</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
       {translations.data.map((data: any) => (
      <TableRow key={data.id}>
      <TableCell>{data.key}</TableCell>
         <TableCell>
          <RiDeleteBin5Line onClick={()=>handelDeleteTranslation(selectedProject._id,data.id)}/>
          </TableCell>
          <TableCell>
          <CiEdit  onClick={() => {
                    setSelectedRowId(data.id);
                    const languagesForKey = Object.keys(translations.dictionary).filter((lang) => 
                      translations.dictionary[lang][data.key]);
                    setSelectedLanguages(languagesForKey);
                    setUpdateDialogOpen(true);
                  }} />
          </TableCell>

          <TableCell>
           <Typography>{translations.dictionary.en[data.key]}</Typography>
          </TableCell>
          <TableCell>
          {Object.keys(translations.dictionary).map((lang) => (
                <Typography key={lang}>
                    {lang}
                </Typography>
        ))}
          </TableCell>
          <TableCell >
          {Object.keys(translations.dictionary).map((langKey) => (
                <Typography key={langKey}>
                    {translations.dictionary[langKey][data.key]}
                </Typography>
        ))}
          </TableCell>
     </TableRow>
  ))}
        </TableBody>
      </Table>
    </TableContainer> 
  </Box>
)}

<Dialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)} fullWidth>
  <DialogTitle>Update Translation</DialogTitle>
  <DialogContent>
   <form onSubmit={handleSubmitUpdate((data) => {
        if (selectedRowId) {
          SubmitUpdate(selectedProject._id, selectedRowId, data);
        } else {
          toast.error('No row selected');
        }
      })}>
      <TextField 
    {...update("key")}
    label="Key"
    fullWidth
    margin="normal"
  />
  <TextField
    {...update("text")}
    label="Text"
    fullWidth
    margin="normal"
  />
  <FormControl fullWidth margin="normal">
  <Select
  {...update("UpdateLanguages")} 
  multiple
  renderValue={(selected) => (
    <Box>
      {selected.map((value) => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  )}
  defaultValue={selectedLanguages}
>
</Select>
  </FormControl>
  <Button onClick={() => setUpdateDialogOpen(false)} >Cancel</Button>
<Button type="submit" variant="contained" onClick={() => setUpdateDialogOpen(false)} >Update</Button>
</form>
  </DialogContent>
</Dialog>
    </Box>
  )}

          <Box >
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Page;
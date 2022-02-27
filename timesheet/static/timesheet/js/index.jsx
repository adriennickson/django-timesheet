import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useForm } from 'react-hook-form';
const JSON5 = require('json5')

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./../css/react-draft-wysiwyg.css";

const formatComment = (comment) => comment.replaceAll("\", sans-serif", "").replaceAll("None", "null").replaceAll("False", "false").replaceAll("True", "true").replaceAll("\n", "")

const Commit = ({ onCommitUpdate, data }) => {

  const { watch, register } = useForm({defaultValues: {
    ...(data?.commit ? {commit: data.commit} : {})
  }});
  useEffect(() => {
    const subscription = watch((value) => onCommitUpdate(value));
    return () => subscription.unsubscribe();
  }, [watch])


  return (
    <>
      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="black"
            d="M510.486,284.482l-27.262-83.963c.012.038.016.077.028.115-.013-.044-.021-.088-.033-.132v-.01L429.1,33.871a21.328,21.328,0,0,0-20.445-14.6A21.038,21.038,0,0,0,388.466,34L337.094,192.154H175L123.533,33.989A21.033,21.033,0,0,0,103.35,19.274h-.113A21.467,21.467,0,0,0,82.86,34L28.888,200.475l-.008.021v0c-.013.042-.019.084-.033.127.012-.038.017-.077.029-.115L1.514,284.482a30.6,30.6,0,0,0,11.117,34.283L248.893,490.427c.035.026.074.041.109.067.1.072.2.146.3.214-.1-.065-.187-.136-.282-.2l0,0c.015.012.033.02.05.031s.027.015.041.024l.006,0a11.992,11.992,0,0,0,1.137.7c.054.03.1.068.157.1l0,0c.033.016.064.038.1.054s.053.02.077.032.038.015.056.023c.044.021.092.034.136.057.205.1.421.178.633.264.2.082.389.177.592.248l.025.011c.034.012.064.028.1.04s.083.032.125.046l.05.012c.053.016.11.024.163.039.019.006.042.009.063.015.284.086.579.148.872.213.115.026.225.062.341.083.017,0,.032.009.05.012.038.008.073.021.112.027.062.011.122.031.186.04.049.007.1,0,.151.012h.033a11.918,11.918,0,0,0,1.7.136h.019a11.971,11.971,0,0,0,1.7-.136h.033c.05-.008.1,0,.153-.012s.124-.029.187-.04c.038-.006.073-.019.11-.027.017,0,.032-.009.049-.012.118-.023.231-.059.349-.084.288-.064.578-.126.861-.21.019-.006.039-.008.059-.014.055-.017.113-.024.169-.041.016-.006.035-.007.051-.012.044-.013.086-.032.129-.047s.063-.028.1-.041l.026-.01c.214-.076.417-.175.627-.261s.394-.154.584-.245c.047-.023.1-.036.142-.059.018-.009.04-.015.058-.024s.053-.02.078-.033.068-.04.1-.056l0,0c.056-.028.106-.069.161-.1a12.341,12.341,0,0,0,1.132-.695c.029-.02.062-.035.092-.056.008-.006.017-.009.024-.015.035-.026.076-.043.11-.068l236.3-171.666A30.6,30.6,0,0,0,510.486,284.482ZM408.8,49.48l46.342,142.674H362.46Zm-305.6,0,46.428,142.675H56.948ZM26.817,299.251a6.526,6.526,0,0,1-2.361-7.308l20.34-62.42L193.835,420.6Zm38.245-82.972h92.411L223.354,419.22Zm183.416,273.83c-.047-.038-.092-.079-.138-.118-.009-.008-.018-.018-.028-.026-.091-.075-.18-.152-.268-.231-.172-.15-.341-.3-.5-.462.014.012.029.022.043.035l.055.046a12.191,12.191,0,0,0,1.091.929l.012.011c.018.013.033.03.051.045C248.689,490.263,248.58,490.19,248.478,490.109Zm7.514-48.482L217.226,322.21,182.839,216.279H329.253Zm7.935,48.107c-.091.079-.178.157-.27.233l-.032.028c-.047.038-.091.079-.136.117-.1.08-.209.152-.313.229.018-.013.033-.032.053-.044l.009-.009a11.69,11.69,0,0,0,1.086-.926c.014-.013.03-.024.044-.036s.038-.03.054-.047C264.262,489.435,264.1,489.586,263.927,489.734Zm90.7-273.455h92.4l-18.91,24.23-139.468,178.7Zm130.567,82.967L318.2,420.563,467.284,229.538l20.258,62.393A6.528,6.528,0,0,1,485.189,299.246Z"
          />
        </svg>
      </span>
      <input
        {...register('commit', { pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ })}
        type="url"
        name="commit"
        id="company-website"
        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
        placeholder="www.example.com"
      />
    </>
  )
}

/**
 * List of commits
 * @param {Array} commits
 * @param {Function} uptateCommits
 * @param {Function} uptateCommitsData
 * @returns
 */
const CommitList = ({commits, updateCommits, uptateCommitsData, initialCommitsData}) => {
  const [commitsData, setCommitsData] = useState(initialCommitsData ? initialCommitsData : {})

  const onDeleteCommit = (position) => {
    updateCommits(commits.filter(commit => commit != position))
  }

  const handleCommitUpdate = (index, data) => {    
    const newCommitsData = { ...commitsData,  }
    newCommitsData[index] = data
    setCommitsData(old => ({...old, ...newCommitsData}))
  }

  useEffect(() => uptateCommitsData(commitsData), [commitsData])

  return (
    <>
      {commits.map(index => (
        <div key={index} className="px-4 py-5 bg-white sm:p-6 border-2 rounded-lg mt-2">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> commit </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <Commit onCommitUpdate={(data) => handleCommitUpdate(index, data)} key={index} data={initialCommitsData[index]} />
                <button
                  onClick={() => onDeleteCommit(index)}
                  type="button"
                  className="inline-flex justify-center py-2 ml-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete link
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

const Task = ({ onTaskUpdate, task }) => {
  console.log(task);
  const [commits, setCommits] = useState( task?.commits ? task.commits.map((value, index) => index) : [] );

  const initialCommitsData = {}
  if (task?.commits) {
    task.commits.forEach((value, index) => {
      initialCommitsData[index] = {commit: value.commit}
    })
  }
  const [commitsData, setCommitsData] = useState( initialCommitsData )
  const [formData, setFormData] = useState({
    ...( task?.comment ? {comment: JSON5.parse(formatComment(task.comment))} : {} ),
    ...( task?.number_of_hours ? {number_of_hours: task.number_of_hours} : {} ),
    ...( task?.project ? {project: task.project} : {} ),
    commits: initialCommitsData
  })

  const [editorState, setEditorState] = useState(
    () => task?.comment ? EditorState.createWithContent(convertFromRaw(JSON5.parse(formatComment(task.comment)))) : EditorState.createEmpty(),
    () => EditorState.createEmpty(),
  );

  const { watch, register, setValue } = useForm({defaultValues: {
    ...( task?.comment ? {comment: JSON5.parse(formatComment(task.comment))} : {} ),
    ...( task?.number_of_hours ? {number_of_hours: task.number_of_hours} : {} ),
    ...( task?.project ? {project: task.project} : {} ),
  }});

  const onUptateCommitsList = (data) => {
    setCommits(data)
  }

  const onUptateCommitsData = (data) => {
    const newCommitsData = {}
    if (data) {
      Object.entries(commitsData).filter(([key, value]) => commits.includes(key)).forEach(([key, value]) => {newCommitsData[key] = value})
      Object.entries(data).forEach(([key, value]) => {newCommitsData[key] = value})
    }
    setCommitsData(newCommitsData)    
  }

  useEffect(() => {
    const newCommitsData = {}
    Object.entries(commitsData).filter(([key, value]) => commits.includes(parseInt(key))).forEach(([key, value]) => {newCommitsData[key] = value})
    setCommitsData(newCommitsData)
  }, commits)


  useEffect(() => {
    const subscription = watch((value) => {
      setFormData(old => ({ ...old, ...value }))
    });
    return () => subscription.unsubscribe();
  }, [watch])

  useEffect(() => {
    setFormData((old) => ({ ...old, commits: commitsData }))
  }, [commitsData])

  useEffect(() => {
    onTaskUpdate(formData)
  }, [formData])

  const onAddCommit = () => {
    const index = commits.length ? parseInt(commits[commits.length - 1]) + 1 : 0
    setCommits(oldCommits => [...oldCommits, index])
    return -1
  }

  const onCommentChange = (data) => {
    setValue("comment", JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  }


  return (
    <>
      <div className="sm:col-span-3">
        <label htmlFor="project" className="block text-sm font-medium text-gray-700"> Projet </label>
        <div className="mt-1">
          <select
            {...register('project', { required: true })}
            id="project"
            name="project"
            autoComplete="project-name"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          >
            <option>lezin</option>
            <option>formations</option>
            <option>figma</option>
          </select>
        </div>
      </div>


      <div className="sm:col-span-3 mt-2">
        <label htmlFor="project" className="block text-sm font-medium text-gray-700"> Temps de travail (En heure) </label>
        <div className="mt-1">
          <input
            {...register('number_of_hours', { valueAsNumber: true, required: true })}
            type="number"
            required
            name="number_of_hours"
            id="number_of_hours"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          />          
        </div>
      </div>



      <div className=" mt-2">
        <label htmlFor="about" className="block text-sm font-medium text-gray-700"> Commentaire </label>
        <div className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            onChange={onCommentChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            required
          />
        </div>
      </div>
      <fieldset className="px-2 py-5 bg-white sm:p-6 border-2 m-2 rounded-lg">
        <legend>Commits links</legend>

        <CommitList commits={commits} updateCommits={onUptateCommitsList} uptateCommitsData={onUptateCommitsData} initialCommitsData={initialCommitsData} />

        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            onClick={onAddCommit}
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add link
          </button>
        </div>
      </fieldset>
    </>
  )
}

const App = ({daily}) => {  
  const [editorState, setEditorState] = useState(
    () => daily?.comment ? EditorState.createWithContent(convertFromRaw(JSON5.parse(formatComment(daily.comment)))) : EditorState.createEmpty(),
    // () => EditorState.createEmpty(),
  );

  const [tasksData, setTasksData] = useState(daily?.tasks || {})
  const [tasks, setTasks] = useState(daily?.tasks ? daily.tasks.map((task,index) => (
    <Task
      key={index}
      onTaskUpdate={((data) => handleTaskUpdate(index, data))}
      task={task}
    />
  )) : []);

  const { setValue, register, handleSubmit, errors } = useForm({defaultValues: {
    ...( daily?.comment ? {comment: JSON5.parse(formatComment(daily.comment))} : {} ),
  }});

  const onSubmit = (data) => {
    const daily = {
      ...data,
      tasks: tasksData
    }
    let isValid = daily.comment ? true : false;
    if (isValid) {
      Object.entries(tasksData).filter(([key, task]) => {
        if (!task.comment) {
          isValid = false
        }
      })
    }
    if (!isValid) {
      alert("Les champs de textes ne peuvent pas etre vide!!!")
      return
    }
    const url = `${window.location.pathname}${window.location.search}`
    fetch(url, {
      method: 'post',
      headers: {'X-CSRFToken': getCookie('csrftoken')},
      body: JSON.stringify(daily),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.location.href = '/timesheet/list/';
      // const reader = body.getReader();
      // ...
    });
  };

  const handleTaskUpdate = (index, data) => {
    const newTasksData = { ...tasksData }
    newTasksData[index] = data
    setTasksData(newTasksData)
  }
  const onAddTask = () => {
    const index = tasks.length ? parseInt(tasks[tasks.length - 1].key) + 1 : 0
    setTasks([...tasks, (
      <Task
        key={index}
        onTaskUpdate={((data) => handleTaskUpdate(index, data))}
      />
    )])
  }

  const onDeleteTask = (position) => {
    setTasks(tasks.filter(task => task.key != position));
    const newTasksData = {}
    Object.entries(tasksData).filter(([key, value]) => key != position ).forEach(([key, value]) => {newTasksData[key] = value})
    setTasksData(newTasksData);
  }

  useEffect(() => {
    // ...
  }, [editorState]);

  const onCommentChange = (data) => {
    setValue("comment", JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <div className="text-gray-600 bg-gray-50 p-2">

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Daily</h3>
                <p className="mt-1 text-sm text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis id, ullam voluptas nihil soluta aliquam architecto non quod similique tenetur molestiae velit laboriosam, illo consequatur ratione eaque nisi cupiditate sint?</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700"> Commentaire général </label>
                    <div className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md">
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        onChange={onCommentChange}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        required
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Tâches détaillés</h3>
                <p className="mt-1 text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quo nam nulla voluptatibus laudantium? Officia aperiam enim perferendis fuga cum, et amet veritatis nemo eaque totam reprehenderit commodi blanditiis itaque.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">

              <div className="shadow overflow-hidden sm:rounded-md">

                {tasks.map(task => (
                  <div key={task.key} className="px-4 py-5 bg-white sm:p-6 border-4 m-2 rounded-lg">
                    <div className="text-right">
                      <button
                        onClick={() => onDeleteTask(task.key)}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete task
                      </button>
                    </div>
                    {task}
                  </div>
                ))}

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={onAddTask}
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add task
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <input type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

if (typeof window !== "undefined") {
  console.log("🚀", window.received_daily ? JSON5.parse(window.received_daily) : undefined);
  for (const [key, value] of Object.entries(window.received_daily ? JSON5.parse(window.received_daily) : {})) {
    console.log(`${key}: `, value);
  }
}

if (document.getElementById("app")) {
  ReactDOM.render(<App daily={window.received_daily ? JSON5.parse(window.received_daily) : undefined} />, document.getElementById("app"));
  module.hot.accept();    
}

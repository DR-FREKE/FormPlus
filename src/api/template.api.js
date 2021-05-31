const BASE_URL = "https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1";

const processTemplate = (template, index) => ({
  id: index + 1,
  template_name: template.name,
  description: template.description,
  categories: template.category,
  template_link: template.link,
  date_created: template.created,
});

// get match the filtered category with the category array
const getCategory = (value) => (content) => {
  const res = content.categories.find((item) => item === value);
  return res;
};

//fetch the data using this endpoint
export const fetchTemplateData = async () => {
  const response = await fetch(`${BASE_URL}/public/task_templates`);

  if (response.ok) {
    const data = await response.json();
    const templates = data.map(processTemplate);
    const total = templates.length;

    return { templates, total };
  } else {
    const error_msg = await response.json();
    throw new Error(error_msg);
  }
};

export const filterTemplateData = async (templates, filter_val) => {
  if (templates.length > 0) {
    const result =
      filter_val == "All Templates"
        ? templates
        : templates.filter(getCategory(filter_val));
    const total = result.length;
    // alert(filter_val);

    // alert(JSON.stringify(result));

    return { result, total };
  } else {
    throw new Error("an error occured");
  }
};

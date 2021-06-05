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

const compareData = (value) => (content1, content2) => {
  // convert to small letters
  const name_one = content1.template_name.toLowerCase();
  const name_two = content2.template_name.toLowerCase();
  if (name_one < name_two && value == "dsc") return 1;

  if (name_one > name_two && value == "asc") return 2;

  return 0;
};

const compareDate = (value) => (date1, date2) => {
  if (date1.date_created < date2.date_created && value == "dsc") return 1;

  if (date1.date_created > date2.date_created && value == "asc") return 2;

  return 0;
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

    return { result, total };
  } else {
    throw new Error("an error occured");
  }
};

export const sortByOrder = (templates, value) => {
  if (templates.length > 0) {
    const result = templates.sort(compareData(value));

    const total = result.length;

    return { result, total };
  } else {
    throw new Error("an error occured");
  }
};

export const sortByDate = (templates, value) => {
  if (templates.length > 0) {
    const result = templates.sort(compareDate(value));

    const total = result.length;

    return { result, total };
  } else {
    throw new Error("an error occured");
  }
};

export const searchTemplateForm = async (templates, value) => {
  if (templates.length > 0) {
    const result = templates.filter((content) =>
      content.template_name.toLowerCase().includes(value)
    );
    const total = result.length;

    if (total <= 0) throw new Error("Template does not exists");
    return { result, total };
  } else {
    throw new Error("an error occured");
  }
};
